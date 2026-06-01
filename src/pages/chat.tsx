import { useState, useEffect, useRef } from "react";
import { useAuth } from "../AuthContext";

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

interface Props {
  recipientId?: string;
  adminMode?: boolean;
  recipientName?: string;
}

let globalWs: WebSocket | null = null;

const Chat: React.FC<Props> = ({ recipientId, adminMode, recipientName }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const senderId = adminMode ? "support" : user?.id ? String(user.id) : "guest-" + Math.random().toString(36).substr(2, 9);
  const isAdmin = user?.role === "admin";

  const loadHistory = async () => {
    const userId = adminMode && recipientId ? recipientId : senderId;
    const token = localStorage.getItem("token");
    if (!token || !userId) return;
    try {
      const res = await fetch(`http://localhost:8081/api/admin/chat-history?user_id=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  };

  const connectWebSocket = () => {
    if (globalWs) {
      globalWs.close();
      globalWs = null;
    }

    const params = `?user_id=${encodeURIComponent(senderId)}`;
    const wsUrl = `ws://localhost:8081/ws${params}`;
    const ws = new WebSocket(wsUrl);
    globalWs = ws;

    ws.onopen = () => setIsConnected(true);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) return;

        if (data && data.content) {
          if (adminMode && recipientId) {
            if (data.sender_id === recipientId || data.recipient_id === recipientId) {
              setMessages(prev => {
                if (prev.some(m => m.id === data.id)) return prev;
                return [...prev, data];
              });
            }
          } else if (!adminMode) {
            if (data.sender_id === senderId || data.recipient_id === senderId || data.recipient_id === "support") {
              setMessages(prev => {
                if (prev.some(m => m.id === data.id)) return prev;
                return [...prev, data];
              });
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
      reconnectTimeoutRef.current = setTimeout(connectWebSocket, 3000);
    };

    ws.onerror = (e) => console.error("[Chat] WebSocket error", e);
  };

  useEffect(() => {
    if (adminMode && recipientId) {
      loadHistory();
      connectWebSocket();
      return () => {
        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        if (globalWs) { globalWs.close(); globalWs = null; }
      };
    }
  }, [adminMode, recipientId]);

  useEffect(() => {
    if (!adminMode && isOpen) {
      loadHistory();
      connectWebSocket();
      return () => {
        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        if (globalWs) { globalWs.close(); globalWs = null; }
      };
    }
  }, [isOpen, adminMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const getSenderDisplay = (msg: Message) => {
    if (msg.sender_id === senderId) return "Вы";
    if (!adminMode) return "Администратор";
    return recipientName || msg.sender_id;
  };

  if (!isOpen && !isAdmin) {
    return (
      <div className="chat-bubble" onClick={() => setIsOpen(true)}>
        Чат поддержки
      </div>
    );
  }

  if (adminMode && !recipientId) return null;

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div>{adminMode && recipientName ? `Диалог с ${recipientName}` : "Поддержка"}</div>
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
            <div className="msg-sender">{getSenderDisplay(msg)}</div>
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