import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./admin.css";

import user from "./user.png";
import qongiroq from "./qon.png";
import menu from "./menu.png";
import admin from "./admin.png";
import cal from "./cal.png";
import mes from "./mes.png";
import set from "./set.png";
import shop from "./shop.png";
import logo from "../Menu_layout/img/aniDub_logo.png";
import Chat from "./chat";

type MenuItem = "Dashboard" | "Shop" | "Chat" | "Calendar" | "Settings";

interface Item {
  id: number;
  img: string;
  name: string;
  logo: string;
}

interface ChatMessage {
  userId: number;
  message: string;
  timestamp: string;
}

const Ad: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuItem>("Dashboard");
  const [data, setData] = useState<Item[]>([]);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      toast.success(`Xush kelibsiz, ${name}!`);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://6d548820c3f18dbd.mokky.dev/Cards"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Item[] = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setChatMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handleMenuClick = (menuItem: MenuItem) => {
    setActiveMenu(menuItem);
    setSidebarOpen(false);
  };

  const handleEdit = (id: number) => {
    console.log("Edit item with id:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete item with id:", id);
    setData(data.filter((item) => item.id !== id));
  };

  const handleImageClick = (imgSrc: string) => {
    setSelectedImage(imgSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        userId: 1, // Replace with dynamic userId
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      const updatedMessages = [...chatMessages, message];
      setChatMessages(updatedMessages);
      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
      setNewMessage("");
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="gradient_card p-4">
                <h2 className="text-xl font-semibold mb-2">New Leads</h2>
                <p className="text-3xl font-bold text-blue-600">3050</p>
              </div>
              <div className="gradient_card p-4">
                <h2 className="text-xl font-semibold mb-2">This week Sales</h2>
                <p className="text-3xl font-bold text-blue-600">$80,500</p>
              </div>
              <div className="gradient_card p-4">
                <h2 className="text-xl font-semibold mb-2">
                  Orders to deliver
                </h2>
                <p className="text-3xl font-bold text-blue-600">305 Orders</p>
              </div>
            </div>
            <div
              style={{
                borderRadius: "30px",
              }}
              className="bg-white p-6 shadow"
            >
              <h2 className="text-xl font-semibold mb-4">
                <span>An</span>imelar
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 text-left text-sm md:text-base">
                        Image
                      </th>
                      <th className="py-2 px-4 text-left text-sm md:text-base">
                        Name
                      </th>
                      <th className="py-2 px-4 text-left text-sm md:text-base">
                        Logo
                      </th>
                      <th className="py-2 px-4 text-left text-sm md:text-base">
                        Edit
                      </th>
                      <th className="py-2 px-4 text-left text-sm md:text-base">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((item) => (
                        <tr key={item.id} className="table_animation">
                          <td className="py-2 px-4">
                            <img
                              onClick={() => handleImageClick(item.img)}
                              style={{ borderRadius: "10%" }}
                              src={item.img}
                              alt={`${item.name} image`}
                              className="w-16 h-16 object-cover cursor-pointer"
                            />
                          </td>
                          <td className="py-2 px-4 text-blue-600 text-sm md:text-base">
                            {item.name}
                          </td>
                          <td className="py-2 px-4">
                            <img
                              src={item.logo}
                              alt={`${item.name} logo`}
                              className="w-16 h-16 object-cover"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <button
                              onClick={() => handleEdit(item.id)}
                              className="text-blue-500 hover:text-blue-700 text-sm md:text-base"
                            >
                              Edit
                            </button>
                          </td>
                          <td className="py-2 px-4">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm md:text-base"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-2 px-4 text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "Shop":
        return <div>Shop Content</div>;
      case "Chat":
        return <Chat />;
      case "Calendar":
        return <div>Calendar Content</div>;
      case "Settings":
        return <div>Settings Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex h-screen ">
      <aside
        className={`gradient-custom  shadow-md w-64 p-4 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <img
            style={{
              width: "130px",
            }}
            src={logo}
            alt="Logo"
            className="w-full mb-4"
          />
          <nav className="flex-1">
            <ul className=" p-0">
              <li className="mb-4">
                <button
                  onClick={() => handleMenuClick("Dashboard")}
                  className="button flex items-center space-x-2"
                >
                  <img src={admin} alt="Dashboard" />
                  <span
                    className={`${sidebarOpen ? "block" : "hidden md:block"}`}
                  >
                    Dashboard
                  </span>
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => handleMenuClick("Shop")}
                  className="button flex items-center space-x-2"
                >
                  <img src={shop} alt="Shop" />
                  <span
                    className={`${sidebarOpen ? "block" : "hidden md:block"}`}
                  >
                    Shop
                  </span>
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => handleMenuClick("Chat")}
                  className="button flex items-center space-x-2"
                >
                  <img src={mes} alt="Chat" />
                  <span
                    className={`${sidebarOpen ? "block" : "hidden md:block"}`}
                  >
                    Chat
                  </span>
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => handleMenuClick("Calendar")}
                  className="button flex items-center space-x-2"
                >
                  <img src={cal} alt="Calendar" />
                  <span
                    className={`${sidebarOpen ? "block" : "hidden md:block"}`}
                  >
                    Calendar
                  </span>
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => handleMenuClick("Settings")}
                  className="button flex items-center space-x-2"
                >
                  <img src={set} alt="Settings" />
                  <span
                    className={`${sidebarOpen ? "block" : "hidden md:block"}`}
                  >
                    Settings
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-50 md:hidden"
      >
        <img
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "50%",
          }}
          src={menu}
          alt="Menu"
        />
      </button>
      <div className="flex-1 p-8 bg-gray-100">
        <header className="flex justify-between items-center mb-6">
          <div
            style={{
              marginTop: "-20px",
            }}
            className="flex items-center ms-4"
          >
            <IconButton>
              <span
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                }}
                className="absolute top-0 right-0 text-xs text-white font-bold"
              >
                3
              </span>
              <img
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={qongiroq}
                alt="Notification"
              />
            </IconButton>
            <IconButton onClick={() => navigate("/profil")}>
              <img
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={user}
                alt="User"
              />
            </IconButton>
          </div>
        </header>

        {renderContent()}

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="p-4 rounded-lg shadow-lg relative">
              <img
                onClick={handleCloseModal}
                style={{
                  width: "300px",
                  height: "auto",
                  objectFit: "contain",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                }}
                src={selectedImage || ""}
                alt="Enlarged"
                className="w-full h-auto max-w-4xl"
              />
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Ad;
