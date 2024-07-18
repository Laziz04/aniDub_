import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import logo from "./img/aniDub_logo.png";
import { RiSearchLine } from "react-icons/ri";
import { Box } from "@mui/material";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <nav className="">
      <div className="max-w-7xl mx-auto pe-3">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                style={{
                  width: "160px",
                }}
                src={logo}
                alt=""
              />
            </div>
          </div>
          <div className="flex">
            <div className="hidden md:flex items-center gap-3">
              <Box className="ms-4">
                <RiSearchLine
                  style={{
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowSearchInput(!showSearchInput)}
                />
              </Box>
              {showSearchInput && (
                <input
                  type="text"
                  className="ml-2 px-3 py-1 rounded-md border border-gray-300"
                  placeholder="Search..."
                />
              )}

              <button className=" btn outline-offset-2">login</button>
            </div>
            <div className="flex md:hidden">
              <button
                className="focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <FaBars className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Box className="ms-4">
              <RiSearchLine
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => setShowSearchInput(!showSearchInput)}
              />
            </Box>
            {showSearchInput && (
              <input
                type="text"
                className="ml-2 px-3 py-1 rounded-md border border-gray-300"
                placeholder="Search..."
              />
            )}

            <button className=" btn outline-offset-2">login</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
