import React, { useState } from "react";
import "./profil.css";

interface ComponentProps {
  src: string;
  onSelect: (imageSrc: string) => void;
}

const Component: React.FC<ComponentProps> = ({ src, onSelect }) => {
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`,
      boxShadow: `0px 20px 30px rgba(0, 0, 0, 0.3)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0) rotateY(0) scale(1)",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    });
  };

  return (
    <div onClick={() => onSelect(src)}>
      <div
        style={{
          borderRadius: "20px",
        }}
        className="relative flex justify-center items-center overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="gallery-item shadow-lg rounded-2xl w-48 h-48 cursor-pointer object-cover object-center transition-transform duration-300"
          style={style}
          src={src}
          alt="gallery item"
        />
      </div>
    </div>
  );
};

export default Component;
