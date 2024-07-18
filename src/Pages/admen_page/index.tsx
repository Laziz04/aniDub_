import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import "./admin.css";

function Admin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (name === "test" && password === "1234") {
      setName("");
      setPassword("");
      setMessage("Hush kelibsiz!");
    } else {
      console.log("Kirishga urinishi boshlandi");
    }
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
          {message ? (
            <Box textAlign="center">
              <h1>{message}</h1>
              <button className="logout_button" onClick={() => setMessage("")}>
                Chiqish
              </button>
            </Box>
          ) : (
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
                <button className="login_button" onClick={handleLogin}>
                  Kirish
                </button>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default Admin;
