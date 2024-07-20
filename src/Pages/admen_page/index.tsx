import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Admin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      navigate("/Ad", { state: { userName: name } });
    }
  }, [navigate, name]);

  const handleLogin = () => {
    if (name.length > 0 && password === "1234") {
      localStorage.setItem("loggedIn", "true");
      setIsNavigating(true);
      setDisabled(true);
      setTimeout(() => {
        navigate("/Ad", { state: { userName: name } });
        setIsNavigating(false);
        setDisabled(false);
      }, 500);

      toast.success("Muvaffaqiyatli tizimga kirdingiz!");
    } else {
      setAttempts((prevAttempts) => prevAttempts + 1);
      if (attempts + 1 >= 3) {
        setDisabled(true);
        toast.error(
          "Ko'p marta xato kiritdingiz. Iltimos, birozdan keyin urinib ko'ring."
        );
        setTimeout(() => {
          setDisabled(false);
          setAttempts(0);
        }, 3 * 60 * 1000);
      } else {
        toast.error(
          "Noto'g'ri hisob ma'lumotlari. Iltimos, yana bir bor urinib ko'ring."
        );
      }
    }
    setName("");
    setPassword("");
  };

  return (
    <Box className="background_body">
      <Box className="blur_bacground">
        <Container
          maxWidth="sm"
          sx={{
            color: "primary.contrastText",
            padding: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Box className="login_container text-black">
            <h1 className="font-semibold">
              <span>Ki</span>rish
            </h1>

            <Box className="mt-4">
              <input
                className="login_input"
                type="text"
                placeholder="Ismingizni kiriting"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="login_input"
                type="password"
                placeholder="Parolni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="login_button"
                onClick={handleLogin}
                disabled={
                  disabled || isNavigating || name === "" || password === ""
                }
              >
                Kirish
              </button>
            </Box>
          </Box>
        </Container>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default Admin;
