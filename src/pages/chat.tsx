import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../AuthContext";

interface Message {
  id: string;
  sender_id: string;
  recipient_id?: string;
  content: string;
  created_at: string;
}

interface Props {
  recipientId?: string;
  adminMode?: boolean;
}

let globalWs: WebSocket | null = null;

const Chat: React.FC<Props> = ({ recipientId, adminMode }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const senderId = user?.id ? String(user.id) : "guest-" + Math.random().toString(36).substr(2, 9);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!adminMode || !recipientId) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`http://localhost:8081/api/admin/chat-history?user_id=${recipientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(console.error);
  }, [recipientId, adminMode]);

  const connect = useCallback(() => {
    if (globalWs) {
      globalWs.close();
      globalWs = null;
    }

    const params = senderId ? `?user_id=${encodeURIComponent(senderId)}` : "";
    const wsUrl = `ws://localhost:8081/ws${params}`;
    const ws = new WebSocket(wsUrl);
    globalWs = ws;

    ws.onopen = () => setIsConnected(true);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          if (adminMode && recipientId) {
            const filtered = data.filter(
              (msg: Message) =>
                (msg.sender_id === recipientId && msg.recipient_id === senderId) ||
                (msg.sender_id === senderId && msg.recipient_id === recipientId)
            );
            setMessages(filtered);
          } else if (!adminMode) {
            const filtered = data.filter(
              (msg: Message) =>
                msg.sender_id === senderId ||
                msg.recipient_id === senderId ||
                msg.recipient_id === "support"
            );
            setMessages(filtered);
          } else {
            setMessages([]);
          }
          return;
        }
        if (data && data.content) {
          if (adminMode && recipientId) {
            if (
              (data.sender_id === recipientId && data.recipient_id === senderId) ||
              (data.sender_id === senderId && data.recipient_id === recipientId)
            ) {
              setMessages((prev) => [...prev, data]);
            }
          } else if (!adminMode) {
            if (
              data.recipient_id === senderId ||
              data.sender_id === senderId ||
              data.recipient_id === "support"
            ) {
              setMessages((prev) => [...prev, data]);
            }
          }
        }
      } catch (e) {
        console.error("[Chat] Parse error", e);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      globalWs = null;
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(connect, 3000);
    };

    ws.onerror = (e) => console.error("[Chat] WebSocket error", e);
  }, [senderId, adminMode, recipientId]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [connect]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [isOpen, messages.length]);

  const sendMessage = () => {
    if (!input.trim()) return;
    if (!globalWs || globalWs.readyState !== WebSocket.OPEN) return;

    const payload: any = { content: input.trim() };
    payload.recipient_id = adminMode && recipientId ? recipientId : "support";

    globalWs.send(JSON.stringify(payload));
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  if (!isOpen && !isAdmin) {
    return (
      <div className="chat-bubble" onClick={() => setIsOpen(true)}>
        Чат поддержки
      </div>
    );
  }

  if (adminMode && !recipientId) {
    return null;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>{adminMode && recipientId ? `Диалог с ${recipientId}` : "Поддержка"}</span>
        {!adminMode && (
          <button className="chat-close" onClick={() => setIsOpen(false)}>✖</button>
        )}
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.sender_id === senderId ? "own" : ""}`}
          >
            <div className="msg-sender">
              {msg.sender_id === senderId ? "Вы" : msg.sender_id}
            </div>
            <div className="msg-content">{msg.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!isConnected}
        />
        <button onClick={sendMessage} disabled={!isConnected}>➤</button>
      </div>
    </div>
  );
};

export default Chat;