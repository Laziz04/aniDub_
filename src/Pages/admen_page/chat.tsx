import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";

interface Message {
  id: string;
  userId: number;
  text: string;
  time: string;
}

interface ChatProps {
  name: string;
  profileImage: string;
}

const API_URL = "https://6d548820c3f18dbd.mokky.dev/chat";

const Chat: React.FC<ChatProps> = ({ name, profileImage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  // Fetch messages from API and local storage
  useEffect(() => {
    // Retrieve messages from local storage
    const savedMessages = localStorage.getItem("messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // Fetch messages from API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
        localStorage.setItem("messages", JSON.stringify(data));
      })
      .catch((error) => console.error("Failed to fetch messages:", error));
  }, []);

  useEffect(() => {
    // Sync messages with local storage
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg: Message = {
        id: (messages.length + 1).toString(), // Unique ID creation
        userId: 1, // User ID for the current user
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Update local state and local storage
      setMessages((prevMessages) => [...prevMessages, newMsg]);

      // Send new message to API
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMsg),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Message sent:", data);
        })
        .catch((error) => console.error("Failed to send message:", error));

      setNewMessage(""); // Clear input
    }
  };

  const renderMessage = (msg: Message) => {
    const isUserMessage = msg.userId === 1;

    return (
      <div
        key={msg.id}
        className={`flex ${
          isUserMessage ? "justify-end" : "justify-start"
        } mb-4`}
      >
        {!isUserMessage && (
          <img
            src={profileImage}
            alt={name}
            className="w-10 h-10 rounded-full mr-3"
          />
        )}
        <div
          className={`p-3 rounded-lg ${
            isUserMessage ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
          style={{
            maxWidth: "60%",
            background: `linear-gradient(to right, ${
              isUserMessage ? "#1e3a8a" : "#d1d5db"
            }, ${isUserMessage ? "#3b82f6" : "#9ca3af"})`,
          }}
        >
          <p>{msg.text}</p>
          <p className="text-xs mt-1 text-right">{msg.time}</p>
        </div>
        {isUserMessage && (
          <img
            src={profileImage}
            alt={name}
            className="w-10 h-10 rounded-full ml-3"
          />
        )}
      </div>
    );
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => renderMessage(msg))}
      </div>
      <div className="flex p-4 border-t border-gray-300">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg"
          placeholder="Yangi xabar yozing..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Yuborish
        </button>
      </div>
    </div>
  );
};

export default Chat;
