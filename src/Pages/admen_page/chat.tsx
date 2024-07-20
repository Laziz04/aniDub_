import React, { useState, useEffect } from "react";
import user from "./user.png"; // Profil rasm yo'li
import axios from "axios";

interface ChatMessage {
  userId: number;
  userName: string;
  userProfilePic: string;
  message: string;
  timestamp: string;
}

const API_URL = "https://6d548820c3f18dbd.mokky.dev/chat";

const Chat: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Xabarlarni olish funksiyasi
  const fetchMessages = async () => {
    try {
      const response = await axios.get(API_URL);
      setChatMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // Sahifa yuklanganda va har 5 soniyada xabarlarni yangilash
  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Xabarni yuborish funksiyasi
  const handleSendMessage = async () => {
    const userName = localStorage.getItem("name") || "Anonymous";
    const userProfilePic = localStorage.getItem("profilePic") || user;
    const userId = 1; // Sizning userId qiymati

    if (newMessage.trim()) {
      const message: ChatMessage = {
        userId,
        userName,
        userProfilePic,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };

      try {
        await axios.post(API_URL, message);
        setNewMessage("");
        fetchMessages(); // Xabar yuborilgandan keyin xabarlarni yangilash
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Chat</h2>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-4">
          <div className="flex flex-col space-y-4">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.userId === 1 ? "justify-end" : "justify-start"
                } space-x-3`}
              >
                {msg.userId === 1 ? (
                  <div className="flex flex-col items-end">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <p className="text-sm text-right">{msg.message}</p>
                      <span className="text-xs text-gray-500">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-3">
                    <img
                      src={msg.userProfilePic}
                      alt={`${msg.userName}'s Avatar`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-sm font-medium">{msg.userName}</p>
                      <p className="text-sm">{msg.message}</p>
                      <span className="text-xs text-gray-500">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg p-2"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
