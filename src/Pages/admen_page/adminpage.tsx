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

type MenuItem = "Dashboard" | "Shop" | "Users" | "Settings" | "users";

interface Item {
  id: number;
  img: string;
  name: string;
  logo: string;
  phone: string;
  description?: string; // Optional field
  views?: number; // Optional field
}

const Ad: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuItem>("Dashboard");
  const [data, setData] = useState<Item[]>([]);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Item[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    img: "",
    name: "",
    description: "",
    views: 0,
  });
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);
  const name = localStorage.getItem("name");
  const profilimg = localStorage.getItem("selectedProfilImage");

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
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleMenuClick = (menuItem: MenuItem) => {
    setActiveMenu(menuItem);
    setSidebarOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `https://6d548820c3f18dbd.mokky.dev/Cards/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setData(data.filter((item) => item.id !== id));
      toast.success("anime muvaffaqiyatli o'chirildi");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  const handleImageClick = (imgSrc: string) => {
    setSelectedImage(imgSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "https://6d548820c3f18dbd.mokky.dev/access"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Item[] = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to fetch notifications");
      }
    };

    fetchNotifications();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData((prev) => ({
          ...prev,
          img: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (currentItemId !== null) {
      try {
        const edit = await fetch(
          `https://6d548820c3f18dbd.mokky.dev/Cards/${currentItemId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editFormData),
          }
        );
        if (!edit.ok) {
          const erroredit = await edit.text();
          throw new Error(`Failed to update item: ${erroredit}`);
        }

        // Verify the response
        const updatedData = await edit.json();
        console.log("Updated Data:", updatedData);

        // Update local state or refetch data
        setData((prevData) =>
          prevData.map((item) =>
            item.id === currentItemId ? updatedData : item
          )
        );
        toast.success("Item updated successfully");
      } catch (error) {
        console.error("Error updating item:", error);
        toast.error("Failed to update item");
      } finally {
        setIsEditModalOpen(false);
        setCurrentItemId(null); // Reset currentItemId
      }
    }
  };
  const handleEdit = (id: number) => {
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setEditFormData({
        img: itemToEdit.img,
        name: itemToEdit.name,
        description: itemToEdit.description || "",
        views: itemToEdit.views || 0,
      });
      setCurrentItemId(id);
      setIsEditModalOpen(true);
    } else {
      console.error("Item to edit not found:", id);
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
              <div className=" flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">
                  <span>An</span>imelar
                </h2>
                <button>Creat anime</button>
              </div>
              <div className="overflow-x-auto" style={{ height: "330px" }}>
                <table className="min-w-full" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th className="py-2 px-4 text-left text-sm md:text-base">
                        Image
                      </th>
                      <th className="py-2 px-4 text-left text-sm md:text-base">
                        Name
                      </th>
                      <th className="py-2 px-4 text-left text-sm md:text-base"></th>
                      <th className="py-2 px-4 text-left text-sm md:text-base">
                        wiev
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((item) => (
                        <tr key={item.id} className="">
                          <td className="py-2 px-4">
                            <img
                              onClick={() => handleImageClick(item.img)}
                              style={{ borderRadius: "50%" }}
                              src={item.img}
                              alt={`${item.name} image`}
                              className="w-16 h-16 object-cover cursor-pointer"
                            />
                          </td>
                          <td className="py-2 px-4 text-blue-600 text-sm md:text-base">
                            {item.name}
                          </td>
                          <td></td>
                          <div>
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
                          </div>
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
      case "users":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Newly Registered Users
            </h2>
            <div className="overflow-x-auto p-10" style={{ height: "580px" }}>
              <table className="min-w-full" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left text-sm md:text-base">
                      ID
                    </th>
                    <th className="py-2 px-4 text-left text-sm md:text-base">
                      Name
                    </th>
                    <th className="py-2 px-4 text-left text-sm md:text-base">
                      Date Registered
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="min-w-full flex gap-1"
                  style={{ width: "100%", flexDirection: "column" }}
                >
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <tr
                        style={{ width: "100%" }}
                        key={notification.id}
                        className="table_animation my-2 flex justify-between min-w-full"
                      >
                        <td className="py-2 px-4 text-sm md:text-base">
                          {notification.id}
                        </td>
                        <td className="py-2 px-4 text-sm md:text-base">
                          {notification.name}
                        </td>
                        <td className="py-2 px-4 text-sm md:text-base">
                          {notification.phone}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-2 px-4 text-center">
                        No notifications available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "Shop":
        return <div>Shop Content</div>;
      case "Users":
        return <div>{/* <Message /> */}</div>;
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
            onClick={() => navigate("/Profil")}
            style={{
              width: "120px",
              cursor: "pointer",
              marginBottom: "40px",
            }}
            src={logo}
            alt="Logo"
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
                  onClick={() => handleMenuClick("users")}
                  className="button flex items-center space-x-2"
                >
                  <img src={user} alt="users" />
                  <span
                    className={`${sidebarOpen ? "block" : "hidden md:block"}`}
                  >
                    Users
                  </span>
                </button>
              </li>
              <li className="mb-4">
                <button className="button flex items-center space-x-2">
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
        <header className="flex justify-between  mb-6">
          <div
            style={{
              marginTop: "-20px",
            }}
            className="flex items-center ms-4"
          >
            <IconButton className="user-icon" aria-label="notifications">
              <img
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={qongiroq}
                alt="Notifications"
              />
            </IconButton>
          </div>

          <div className=" flex gap-3 ">
            <div
              style={{
                border: "3px solid #00d3e1",
                borderRadius: "50%",
                padding: "3px",
                objectFit: "cover",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "-20px",
              }}
            >
              <img
                onClick={() => navigate("/profil")}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  width: "42px",
                  height: "42px",
                  objectFit: "cover",
                }}
                src={profilimg || "default-image-url"}
                alt="Profile image"
                className="profile-image"
                loading="lazy"
              />
            </div>

            <span>{name}</span>
          </div>
        </header>

        {renderContent()}

        {isEditModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="p-4 bg-white rounded-lg shadow-lg relative">
              <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Image
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-input"
                  />
                  {editFormData.img && (
                    <img
                      src={editFormData.img}
                      alt="Preview"
                      className="w-24 h-24 object-cover mt-2"
                    />
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleFormChange}
                    className="form-input"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={editFormData.description}
                    onChange={handleFormChange}
                    className="form-input"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Views
                  </label>
                  <input
                    type="number"
                    name="views"
                    value={editFormData.views}
                    onChange={handleFormChange}
                    className="form-input"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

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
