import React from "react";

interface ComponentProps {
  src: string;
  onSelect: (imageSrc: string) => void;
}

const Component: React.FC<ComponentProps> = ({ src, onSelect }) => {
  return (
    <div onClick={() => onSelect(src)}>
      <img
        className="shadow-lg"
        style={{
          borderRadius: "10px",
          width: "240px",
          height: "200px",
          cursor: "pointer",
        }}
        src={src}
        alt="galerya item"
      />
    </div>
  );
};

export default Component;
