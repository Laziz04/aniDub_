import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { TbLogin2 } from "react-icons/tb";
import logo from "./img/aniDub_logo.png";
import bars from "./img/bars.png";
import user from "./img/user.png";
import exit from "./img/off.png";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import "./menu.css";

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
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [openSignModal, setOpenSignModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const navigate = useNavigate();

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
    <nav>
      <div className="respons">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                onClick={() => navigate("/Profil")}
                style={{ width: "120px", cursor: "pointer" }}
                src={logo}
                alt="Logo"
              />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <RiSearchLine
                style={{ color: "#00d3e1", fontSize: "26px" }}
                className="text-2xl cursor-pointer"
                onClick={() => setShowSearchInput(!showSearchInput)}
              />
              {showSearchInput && (
                <input
                  type="text"
                  className="absolute right-5 mt-2 w-48 search_input"
                  placeholder="Search..."
                />
              )}
            </div>
            {!isLoggedIn ? (
              <button
                style={{ width: "120px" }}
                onClick={openSignUpModal}
                className="flex items-center justify-center gap-1 px-4 py-2 text-white bg-gradient-to-b from-teal-400 to-teal-500 rounded-lg shadow-md hover:shadow-lg active:translate-y-[2px] active:shadow-sm"
              >
                Kirish
                <TbLogin2 className="text-xl" />
              </button>
            ) : (
              <button
                style={{ width: "120px" }}
                onClick={openProfile}
                className="flex items-center justify-start gap-2 px-4 py-2 text-teal-500 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 profil_menu"
              >
                <img
                  style={{ width: "22px", height: "22px" }}
                  src={user}
                  alt="Profile"
                />
                Profil
              </button>
            )}
          </div>
          <div className="flex md:hidden">
            <button
              className="focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                style={{ width: "55px", height: "55px" }}
                src={bars}
                alt="Menu"
              />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          style={{ transition: "0.3s ease-out" }}
          className="md:hidden px-2 pt-2 pb-3 space-y-1"
        >
          <div className="relative">
            <RiSearchLine
              style={{ color: "#00d3e1" }}
              className="text-2xl cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-3"
              onClick={() => setShowSearchInput(!showSearchInput)}
            />
            {showSearchInput && (
              <input
                type="text"
                className="mt-2 w-full search_input"
                placeholder="Search..."
              />
            )}
          </div>
          {!isLoggedIn ? (
            <button className="w-full mt-3 Button_bg" onClick={openSignUpModal}>
              Kirish
            </button>
          ) : (
            <button
              style={{ width: "120px" }}
              onClick={openProfile}
              className="flex items-center justify-start gap-2 px-4 py-2 text-teal-500 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200"
            >
              <FaUser />
              Profil
            </button>
          )}
        </div>
      )}

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
              style={{
                marginTop: "20px",
                width: "100%",
                height: "120px",
                marginBottom: "1rem",
                objectFit: "cover",
                borderRadius: "15px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              }}
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
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
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
        BackdropProps={{
          style: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Box
          className="text-teal-500 bg-gray-100 rounded-lg shadow-md"
          sx={{
            position: "absolute",
            top: "58px",
            right: "10px",
            border: "none",
            backgroundColor: "white",
            borderRadius: "15px",
            width: "10%",
            height: "max-content",
            padding: "16px",
          }}
        >
          <p>{name}</p>
          <hr />
          <button className="flex gap-2" onClick={goToProfile}>
            <img
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              src={user}
              alt="Profile"
            />
            <p>Profil</p>
          </button>
          <button className="flex gap-2" onClick={handleLogout}>
            <img
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              src={exit}
              alt="Logout"
            />
            <p>Chiqish</p>
          </button>
        </Box>
      </Modal>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
