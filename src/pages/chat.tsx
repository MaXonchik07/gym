import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../AuthContext";

interface Message {
  id: string;
  sender_id: string;
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
  const senderId = user?.id ? String(user.id) : "guest-" + Math.random().toString(36).substr(2, 9);

  const connect = useCallback(() => {
    if (globalWs) {
      globalWs.close();
      globalWs = null;
    }

    const ws = new WebSocket("ws://localhost:8081/ws");
    globalWs = ws;
    console.log("[Chat] Connecting to WebSocket...");

    ws.onopen = () => {
      console.log("[Chat] WebSocket connected");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          console.log("[Chat] History received:", data.length, "messages");
          setMessages(data);
        } else if (data && data.content) {
          console.log("[Chat] New message:", data);
          setMessages((prev) => [...prev, data]);
        }
      } catch (e) {
        console.error("[Chat] Parse error", e);
      }
    };

    ws.onclose = (e) => {
      console.log("[Chat] WebSocket closed, code:", e.code, "reason:", e.reason);
      setIsConnected(false);
      globalWs = null;
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log("[Chat] Reconnecting...");
        connect();
      }, 3000);
    };

    ws.onerror = (e) => {
      console.error("[Chat] WebSocket error", e);
    };
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [connect]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    if (!globalWs || globalWs.readyState !== WebSocket.OPEN) {
      console.error("[Chat] WebSocket not open");
      return;
    }
    const payload = { sender_id: senderId, content: input.trim() };
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
        <span>Поддержка</span>
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
        <button onClick={sendMessage} disabled={!isConnected}>
          ➤
        </button>
      </div>
    </div>
  );
}

export default Chat 