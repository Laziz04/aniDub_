import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { TbLogin2 } from "react-icons/tb";
import logo from "./img/aniDub_logo.png";
import bars from "./img/bars.png";
import user from "./img/user.png";
import exit from "./img/off.png";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
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
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
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
  const [openprofil, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openprofila, setOpenProfila] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedPhone = localStorage.getItem("phone");

    if (storedName && storedPhone) {
      setName(storedName);
      setPhone(storedPhone);
      setIsLoggedIn(true);
    }
  }, []);

  const handleopenprofil = () => {
    setOpenProfila(true);
  };

  const handleCloseprofil = () => {
    setOpenProfila(false);
  };

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleSubmit = async () => {
    if (name && phone.length >= 10 && !isNaN(Number(phone))) {
      try {
        const response = await fetch(
          "https://6d548820c3f18dbd.mokky.dev/access",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, phone }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save data to the API");
        }

        localStorage.setItem("name", name);
        localStorage.setItem("phone", phone);
        setIsLoggedIn(true);
        handleClose();
      } catch (error) {
        alert("Failed to save data to the API");
      }
    } else {
      alert("Please enter a valid name and phone number.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("phone");
    setIsLoggedIn(false);
    setName("");
    setPhone("+998");
    handleCloseprofil();
    navigate("/");
  };

  const goToProfile = () => {
    handleCloseprofil();
    setTimeout(() => {
      navigate("/profil");
    }, 0);
  };

  return (
    <nav className="">
      <div className="respons">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                style={{
                  width: "120px",
                }}
                src={logo}
                alt="Logo"
              />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <RiSearchLine
                style={{
                  color: "#00d3e1",
                  fontSize: "26px",
                }}
                className="text-2xl cursor-pointer"
                onClick={() => setShowSearchInput(!showSearchInput)}
              />
              {showSearchInput && (
                <input
                  style={{
                    top: "-13px",
                  }}
                  type="text"
                  className="absolute right-5 mt-2 w-48 search_input"
                  placeholder="Search..."
                />
              )}
            </div>
            {!isLoggedIn ? (
              <button
                style={{
                  width: "120px",
                }}
                onClick={handleOpen}
                className="flex items-center justify-center gap-1 px-4 py-2 text-white bg-gradient-to-b from-teal-400 to-teal-500 rounded-lg shadow-md hover:shadow-lg active:translate-y-[2px] active:shadow-sm"
              >
                Kirish
                <TbLogin2 className="text-xl" />
              </button>
            ) : (
              <button
                style={{
                  width: "120px",
                }}
                onClick={handleopenprofil}
                className="flex items-center justify-start gap-2 px-4 py-2 text-teal-500 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 profil_menu"
              >
                <img
                  style={{
                    width: "22px",
                    height: "22px",
                  }}
                  src={user}
                  alt=""
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
                style={{
                  width: "55px",
                  height: "55px",
                }}
                src={bars}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          style={{
            transition: "0.3s ease-out",
          }}
          className="
md:hidden px-2 pt-2 pb-3 space-y-1"
        >
          <div className="relative">
            <RiSearchLine
              style={{
                color: "#00d3e1",
              }}
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
            <button className="w-full mt-3 Button_bg" onClick={handleOpen}>
              Kirish
            </button>
          ) : (
            <button
              style={{
                width: "120px",
              }}
              onClick={handleopenprofil}
              className="flex items-center justify-start gap-2 px-4 py-2 text-teal-500 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200"
            >
              <FaUser />
              Profil
            </button>
          )}
        </div>
      )}

      {/* logout modal */}

      <Modal
        open={openprofil}
        onClose={handleClose}
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
              onClick={handleClose}
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
              src="https://i.pinimg.com/564x/d3/01/f3/d301f37522345d778436d52dbcc50188.jpg" // Top image
              style={{
                marginTop: "20px",
                width: "100%",
                height: "120px",
                marginBottom: "1rem",
                objectFit: "cover",
                borderRadius: "15px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
            <input
              className="input_style"
              type="text"
              placeholder="Ismingizni kiriting..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input_style"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{
                background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                color: "#fff",
                cursor: "pointer",
                display: "inline-block",
                fontSize: "16px",
                fontWeight: "bold",
                lineHeight: "1",
                outline: "none",
                overflow: "hidden",
                padding: "12px 24px",
                position: "relative",
                textDecoration: "none",
                transition:
                  "background-color 0.3s, transform 0.3s, box-shadow 0.3s",

                "&:before, &:after": {
                  content: '""',
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  background: "rgba(255, 255, 255, 0.1)",
                  transition: "transform 0.3s",
                  zIndex: "-1",
                },

                "&:hover": {
                  backgroundColor: "#ff4b2b",
                  boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-2px)",

                  "&:before": {
                    transform:
                      "translate3d(10px, 10px, -20px) rotateX(20deg) rotateY(-15deg) rotateZ(0deg)",
                  },

                  "&:after": {
                    transform:
                      "translate3d(-10px, -10px, -20px) rotateX(-10deg) rotateY(15deg) rotateZ(0deg)",
                  },
                },
              }}
            >
              Send
            </Button>

            <Typography
              variant="body2"
              color="textSecondary"
              className="mt-2"
              align="center"
            >
              Yoki
            </Typography>
            <div className="flex justify-center mt-3 gap-2 w-full">
              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{ borderColor: "red", color: "red", width: "50%" }}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                startIcon={<AppleIcon />}
                sx={{ borderColor: "black", color: "black", width: "50%" }}
              >
                Apple
              </Button>
            </div>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ marginTop: "1rem" }}
            >
              Bu orqali tizimga kirishingiz mumkin
            </Typography>
          </Box>
        </Box>
      </Modal>

      {/* profil modal */}

      <Modal
        open={openprofila}
        onClose={handleCloseprofil}
        BackdropProps={{
          style: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Box
          className=" text-teal-500 bg-gray-100 rounded-lg shadow-md"
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
              style={{
                width: "30px",
                height: "30px",
                objectFit: "cover",
              }}
              src={user}
              alt=""
            />
            <p>Profil</p>
          </button>
          <button className="flex gap-2" onClick={handleLogout}>
            <img
              style={{
                width: "30px",
                height: "30px",
                objectFit: "cover",
              }}
              src={exit}
              alt=""
            />
            <p>Chiqish</p>
          </button>
        </Box>
      </Modal>
    </nav>
  );
};

export default Navbar;
