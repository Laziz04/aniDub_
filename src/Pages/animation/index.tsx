import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import "tailwindcss/tailwind.css";
import "./animation.css";

const images = [
  "https://images7.alphacoders.com/120/1208865.png",
  "https://animejoy.ru/uploads/screenwebp/BlackCloverTV/03.webp",
  "https://i.pinimg.com/736x/84/6c/d0/846cd0fae3dff07a325e7c1befa517d2.jpg",
  "https://img.freepik.com/free-photo/japan-background-digital-art_23-2151546123.jpg",
];

const Animation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const maxSteps = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
      setAnimating(false);
    }, 500);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        left: "69px",
        width: "94%",
        height: "100%",
        zIndex: "-3",
      }}
    >
      <div className="relative w-full h-full">
        <Box
          component="img"
          className={`transition-transform duration-1000 ease-in-out transform ${
            animating ? "slide-fade" : ""
          }`}
          sx={{
            height: { xs: 200, sm: 300, md: 400, lg: 500 },
            display: "block",
            justifyContent: "center",
            overflow: "hidden",
            width: "100%",
          }}
          src={images[activeStep]}
          alt={`slide ${activeStep}`}
        />
      </div>
    </Box>
  );
};

export default Animation;
