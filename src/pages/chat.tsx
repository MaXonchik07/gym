import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../AuthContext";

interface Message {
  id: string;
  sender_id: string;
  recipient_id?: string;
  content: string;
  created_at: string;
}

let globalWs: WebSocket | null = null;

function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const senderId = user?.id ? String(user.id) : "";
  const isAdmin = user?.role === "admin";

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
          setMessages(data);
        } else if (data && data.content) {
          setMessages((prev) => [...prev, data]);
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
  }, [senderId]);

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
    const payload: any = {
      content: input.trim(),
    };
    if (isAdmin) {
    } else {
      payload.recipient_id = "support";
    }
    globalWs.send(JSON.stringify(payload));
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  if (!isOpen) {
    return (
      <div className="chat-bubble" onClick={() => setIsOpen(true)}>
        Чат поддержки
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div>Поддержка</div>
        <button className="chat-close" onClick={() => setIsOpen(false)}>✖</button>
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
          placeholder={isConnected ? "Введите сообщение..." : "Ожидание подключения..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!isConnected}
        />
        <button onClick={sendMessage} disabled={!isConnected}>➤</button>
      </div>
    </div>
  );
}

export default Chat