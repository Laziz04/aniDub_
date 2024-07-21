import React, { useState, useEffect, useRef } from "react";

interface Message {
  text: string;
  timestamp: Date;
  userId: string;
  userName: string;
}

const gradients = [
  "linear-gradient(135deg, #f5a623, #f76b1c)",
  "linear-gradient(135deg, #8e44ad, #9b59b6)",
  "linear-gradient(135deg, #2ecc71, #27ae60)",
  "linear-gradient(135deg, #3498db, #2980b9)",
  "linear-gradient(135deg, #e74c3c, #c0392b)",
];

const currentUser = "myUserId";

const MessageComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem("messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "https://6d548820c3f18dbd.mokky.dev/adminMessage"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Message[] = await response.json();
        setMessages((prevMessages) => {
          const uniqueMessages = [...prevMessages];
          data.forEach((newMsg) => {
            if (
              !prevMessages.some(
                (msg) =>
                  new Date(msg.timestamp).toISOString() ===
                    new Date(newMsg.timestamp).toISOString() &&
                  msg.userId === newMsg.userId
              )
            ) {
              uniqueMessages.push(newMsg);
            }
          });
          localStorage.setItem("messages", JSON.stringify(uniqueMessages));
          return uniqueMessages;
        });
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    const interval = setInterval(fetchMessages, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const message: Message = {
        text: newMessage,
        timestamp: new Date(),
        userId: currentUser,
        userName: "Me",
      };
      try {
        const response = await fetch(
          "https://6d548820c3f18dbd.mokky.dev/adminMessage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, message];
          localStorage.setItem("messages", JSON.stringify(updatedMessages));
          return updatedMessages;
        });
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div
      style={{
        width: "600px",
        margin: "0 auto",
        border: "1px solid #ccc",
        borderRadius: "10px",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        height: "400px",
      }}
    >
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <strong>Chat</strong>
      </div>
      <div
        style={{
          padding: "10px",
          height: "calc(100% - 80px)",
          overflowY: "auto",
          background: "#fff",
          position: "relative",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              background: gradients[index % gradients.length],
              borderRadius: "10px",
              padding: "10px",
              maxWidth: "80%",
              wordBreak: "break-word",
              color: "#333",
              flexDirection:
                message.userId === currentUser ? "row-reverse" : "row",
              marginLeft: message.userId === currentUser ? "auto" : "10px",
              marginRight: message.userId === currentUser ? "10px" : "auto",
            }}
          >
            {message.userId !== currentUser && (
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                style={{ borderRadius: "50%", marginRight: "10px" }}
              />
            )}
            <div
              style={{
                borderRadius: "10px",
                maxWidth: "80%",
                wordBreak: "break-word",
                padding: "10px",
              }}
            >
              {message.text}
            </div>
            {message.userId === currentUser && (
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                style={{ borderRadius: "50%", marginLeft: "10px" }}
              />
            )}
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <div
        className="flex gap-2 items-center justify-center"
        style={{
          padding: "10px",
          borderTop: "1px solid #ccc",
          background: "#f5f5f5",
        }}
      >
        <input
          type="text"
          placeholder="Yozing..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{
            width: "calc(100% - 80px)",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: "10px",
            borderRadius: "5px",
            marginLeft: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
          }}
        >
          Yuborish
        </button>
      </div>
    </div>
  );
};

export default MessageComponent;
