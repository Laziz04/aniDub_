import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./section_filter.css";

interface FilterProps {
  onFilterChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const navigate = useNavigate();

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);

    if (filter === "chat") {
      navigate("/chat");
    }
  };

  return (
    <div className="mt-3">
      <div className="flex flex-wrap justify-between items-center w-full res">
        <div className="flex flex-wrap md:justify-start">
          <div className="p-1">
            <button
              className={`Filter_button ${
                activeFilter === "all" ? "active" : ""
              }`}
              onClick={() => handleFilterChange("all")}
            >
              Barcha animelar
            </button>
          </div>
          <div className="p-1">
            <button
              className={`Filter_button ${
                activeFilter === "film" ? "active" : ""
              }`}
              onClick={() => handleFilterChange("film")}
            >
              Ani Filimlar
            </button>
          </div>
          <div className="p-1">
            <button
              className={`Filter_button ${
                activeFilter === "chat" ? "active" : ""
              }`}
              onClick={() => handleFilterChange("chat")}
            >
              Chat
            </button>
          </div>
        </div>
        <div className="">
          <button className="flex items-center gap-1 Filter_button1">
            Barchasi <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
