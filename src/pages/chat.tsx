import { useState, useEffect, useRef } from "react";
import { useAuth } from "../AuthContext";

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const senderId = user?.id || "guest-" + Math.random().toString(36).substr(2, 9);
  const senderName = user?.firstName || "Гость";

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081/ws");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          // история – берём только объекты с полем content
          setMessages(data.filter((msg) => msg && msg.content));
        } else if (data && data.content) {
          // новое сообщение чата
          setMessages((prev) => [...prev, data]);
        }
        // уведомления о бронировании (без content) игнорируются
      } catch (e) {
        console.error("WebSocket message parse error", e);
      }
    };

    ws.onclose = () => console.log("WebSocket disconnected");

    return () => ws.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !wsRef.current) return;
    wsRef.current.send(
      JSON.stringify({ sender_id: senderId, content: input.trim() })
    );
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
          <div key={msg.id} className={`chat-message ${msg.sender_id === senderId ? "own" : ""}`}>
            <div className="msg-sender">{msg.sender_id === senderId ? "Вы" : msg.sender_id}</div>
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
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}

export default Chat