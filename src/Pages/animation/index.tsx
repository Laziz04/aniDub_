// src/Slider.js

import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import "./animation.css";
const slides = [
  {
    id: 1,
    title: "Attack on Titan Final Season",
    category: "Magic / Adventure",
    imageUrl:
      "https://img.freepik.com/free-photo/autumn-night-illuminated-lantern-tree-yellow-leaf-generated-by-ai_188544-15642.jpg?w=1380&t=st=1721278095~exp=1721278695~hmac=d56394c0c3c69de0d02aef45925574f941d2199eb4cb73b206c550560d378a3a",
  },
  {
    id: 2,
    title: "Siswa Pindahan yang Diremehkan",
    imageUrl:
      "https://img.freepik.com/premium-photo/woman-killed-giant-demon-with-chainsaw-digital-art-atyle-illustration-painting_37402-408.jpg?w=1380",
  },
  {
    id: 3,
    title: "Naruto",
    imageUrl:
      "https://img.freepik.com/premium-photo/city-states-with-chinese-characteristics_456031-61.jpg?w=1380",
  },
  {
    id: 4,
    title: "Example Anime 4",
    imageUrl:
      "https://img.freepik.com/premium-photo/black-wizard-with-magic-wand-summoning-dragon-digital-art-style-illustration-painting_37402-19.jpg?w=1380",
  },
  {
    id: 5,
    title: "Example Anime 5",
    imageUrl:
      "https://img.freepik.com/premium-photo/cityscape-dreams-cartoon-illustration-city-desktop-background_1088462-27.jpg?w=1380",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-96 md:h-[32rem] bg-gray-900 text-white">
        <img
          src={slides[currentSlide].imageUrl}
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 p-4 bg-gradient-to-b bg_bg  to-transparent w-auto">
          <h2 className="text-xl md:text-3xl font-bold">
            {slides[currentSlide].title}
          </h2>
          <p className="text-xs md:text-sm">{slides[currentSlide].category}</p>
          <button className="mt-2 px-2 md:px-4 py-1 md:py-2 bg-blue-600 text-white rounded">
            Watch Now
          </button>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 hidden md:flex">
          {slides.map((slide, index) => (
            <img
              key={slide.id}
              src={slide.imageUrl}
              alt={slide.title}
              className={`w-16 h-16 md:w-24 md:h-24 object-cover rounded cursor-pointer ${
                index === currentSlide ? "ring-2 ring-blue-600" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
