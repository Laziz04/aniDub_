import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";
import logo from "./img/aniDub_logo.png";
import bars from "./img/bars.png";
import user from "./img/user.png";
import exit from "./img/off.png";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import "./menu.css";
import { RiSearchLine } from "react-icons/ri";
import axios from "axios";
import { log } from "console";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "400px",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "hidden",
  p: 0,
};

const backdropStyle = {
  backgroundImage: 'url("https://path-to-your-image.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backdropFilter: "blur(10px)",
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSignModal, setOpenSignModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const navigate = useNavigate();

  interface SearchResult {
    name: string;
    img: string;
  }
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      try {
        const response = await axios.get<SearchResult[]>(
          `https://6d548820c3f18dbd.mokky.dev/Cards`,
          {
            params: { name: query },
          }
        );
        setResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  const openSignUpModal = () => setOpenSignModal(true);
  const closeSignUpModal = () => {
    setOpenSignModal(false);
    setName("");
    setPhone("+998");
    setPassword("");
    setRepeatPassword("");
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedPhone = localStorage.getItem("phone");

    if (storedName && storedPhone) {
      setName(storedName);
      setPhone(storedPhone);
      setIsLoggedIn(true);
    }
  }, []);

  const openProfile = () => setOpenProfileModal(true);
  const closeProfile = () => setOpenProfileModal(false);

  const handleSubmit = async () => {
    if (
      name.trim() &&
      phone.length >= 10 &&
      password &&
      password === repeatPassword
    ) {
      try {
        const response = await fetch(
          "https://6d548820c3f18dbd.mokky.dev/access",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, phone, password }),
          }
        );

        if (!response.ok) {
          toast.error("Failed to fetch data");
        }

        localStorage.setItem("name", name);
        localStorage.setItem("phone", phone);
        localStorage.setItem("password", password);
        setIsLoggedIn(true);
        closeSignUpModal();
      } catch (error) {
        toast.error("Failed to fetch data");
        closeSignUpModal();
      }
    } else {
      toast.error(
        "Iltimos, haqiqiy ism, telefon raqamini kiriting va parollar mos kelishiga ishonch hosil qiling."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("phone");
    setIsLoggedIn(false);
    setName("");
    setPhone("+998");
    closeProfile();
    navigate("/");
  };

  const goToProfile = () => {
    closeProfile();
    navigate("/profil");
  };

  return (
    <nav className="">
      <div className=" px-4">
        <div className="respons flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              onClick={() => navigate("/Profil")}
              className="w-32 cursor-pointer"
              src={logo}
              alt="Logo"
            />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative flex gap-10 items-center">
              <RiSearchLine
                className="text-teal-500 text-2xl cursor-pointer transition-transform hover:scale-105"
                onClick={() => setShowSearchInput(!showSearchInput)}
              />
              {showSearchInput && (
                <input
                  type="text"
                  className="search_input absolute right-7 mt-2 w-48 border rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Search..."
                  style={{
                    transition: "width 0.3s ease-in-out",
                    width: "200px",
                  }}
                />
              )}
            </div>
            {!isLoggedIn ? (
              <button
                style={{
                  backgroundImage: `url('https://i.pinimg.com/originals/ab/39/43/ab394303fe32175912ee20eae0e23cc5.gif')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "20px",
                  width: "140px",
                }}
                onClick={openSignUpModal}
                className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-lg shadow-lg hover:bg-teal-600 transition-colors"
              >
                Kirish
                <TbLogin2 className="text-xl" />
              </button>
            ) : (
              <button
                onClick={openProfile}
                className="flex items-center gap-2 px-4 py-2 text-teal-500 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 transition-colors"
              >
                <img className="w-5 h-5" src={user} alt="Profile" />
                Profil
              </button>
            )}
          </div>
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img className="w-10 h-10" src={bars} alt="Menu" />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0  bg_fg_flter z-30 w-64 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ transition: "transform 0.3s ease-out" }}
      >
        <div className="p-4">
          {!isLoggedIn ? (
            <button
              className="w-full px-4 py-2 text-white  shadow-lg hover:bg-teal-600 transition-colors relative overflow-hidden"
              onClick={openSignUpModal}
              style={{
                backgroundImage: `url('https://i.pinimg.com/originals/ab/39/43/ab394303fe32175912ee20eae0e23cc5.gif')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "30px",
              }}
            >
              <div className="absolute inset-0 transition-transform transform scale-100 hover:scale-110" />
              Kirish
            </button>
          ) : (
            <button
              onClick={openProfile}
              className="w-full flex items-center gap-2 px-4 py-2 text-teal-500 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 transition-colors"
            >
              <FaUser />
              Profil
            </button>
          )}
        </div>
        <div className="relative flex items-center p-4">
          <RiSearchLine
            className="text-teal-500 text-2xl cursor-pointer transition-transform hover:scale-105"
            onClick={toggleSearchInput}
          />
          {showSearchInput && (
            <div className="relative flex items-center p-0 ">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="border search_input px-4 py-2 pl-10 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Search..."
                style={{ transition: "width 0.3s ease-in-out", width: "200px" }}
              />
              <RiSearchLine
                className="absolute right-6 text-teal-500 text-xl cursor-pointer"
                onClick={toggleSearchInput}
              />
              {searchQuery && (
                <div
                  className={`absolute top-full left-0 mt-2 transition-all duration-300 ease-in-out ${
                    searchQuery ? "opacity-100 h-80" : "opacity-0 w-0 h-0"
                  } bg-white border border-teal-500 shadow-lg`}
                  style={{
                    marginTop: "200px",
                    width: "200px",
                    borderRadius: "20px",
                  }} // Adjust if needed
                >
                  <div className="relative ps-4 max-h-60 overflow-auto">
                    <ul>
                      {results.map((result, index) => (
                        <li
                          key={index}
                          className="flex items-center p-2  search_conytainer"
                        >
                          <img
                            src={result.img}
                            alt={result.name}
                            className="w-12 h-12 rounded-full mr-3"
                          />
                          <span>{result.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sign Up Modal */}
      <Modal
        open={openSignModal}
        onClose={closeSignUpModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              ...backdropStyle,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem",
              position: "relative",
            }}
          >
            <IconButton
              onClick={closeSignUpModal}
              sx={{
                position: "absolute",
                top: "5px",
                right: "5px",
                color: "#319795",
              }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src="https://i.pinimg.com/564x/57/ca/98/57ca981288bb93099699264eed00dddd.jpg"
              alt="Top image"
              className="w-full h-32 mb-4 object-cover rounded-lg shadow-md"
            />
            <input
              className="input_style"
              value={name}
              placeholder="Isminggizni kiriting..."
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input_style"
              value={phone}
              placeholder="Telefon raqamingizni kiriting..."
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="input_style"
              type="password"
              value={password}
              placeholder="Yangi parolni kiriting..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="input_style"
              type="password"
              value={repeatPassword}
              placeholder="Parolni qayta kiriting..."
              onChange={(e) => setRepeatPassword(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{
                marginTop: "10px",
                background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                borderRadius: "8px",
                color: "#fff",
                cursor: "pointer",
                display: "inline-block",
                fontSize: "16px",
                fontWeight: "bold",
                lineHeight: "1",
                padding: "12px 24px",
                position: "relative",
                textDecoration: "none",
                transition:
                  "background-color 0.3s, transform 0.3s, box-shadow 0.3s",

                "&:hover": {
                  backgroundColor: "#ff4b2b",
                  boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Ro'yxatdan o'tish
            </Button>

            <Typography
              variant="body2"
              color="white"
              className="mt-2"
              align="center"
            >
              Yoki
            </Typography>
            <Typography
              variant="body2"
              color="white"
              align="center"
              sx={{ marginTop: "1rem" }}
            >
              Hisobingiz yo‘q
              <button
                onClick={openSignUpModal}
                className="text-blue-400 underline"
              >
                tizimga kirish
              </button>
            </Typography>
          </Box>
        </Box>
      </Modal>

      {/* Profile Modal */}
      <Modal
        open={openProfileModal}
        onClose={closeProfile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem",
              backgroundColor: "white",
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{ marginBottom: "1rem", color: "#2b6cb0" }}
            >
              {name}
            </Typography>
            <hr className="w-full border-t border-gray-300 my-2" />
            <button
              className="flex items-center gap-2 px-4 py-2 mb-2 w-full text-teal-500 hover:bg-gray-100 rounded-lg"
              onClick={goToProfile}
            >
              <img className="w-6 h-6 rounded-full" src={user} alt="Profile" />
              Profil
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 w-full text-red-500 hover:bg-gray-100 rounded-lg"
              onClick={handleLogout}
            >
              <img className="w-6 h-6 rounded-full" src={exit} alt="Logout" />
              Chiqish
            </button>
          </Box>
        </Box>
      </Modal>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
