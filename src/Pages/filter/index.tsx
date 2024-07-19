import { FaChevronRight } from "react-icons/fa";
import "./section_filter.css";
import { Box } from "@mui/material";

const Filter = () => {
  return (
    <Box className=" mt-14 respon">
      <div
        style={{
          flexWrap: "wrap",
        }}
        className=" flex items-center gap-3 justify-between "
      >
        <div
          style={{
            flexWrap: "wrap",
          }}
          className="flex gap-3 "
        >
          <button className=" Filter_button">Ani Filimlar</button>
          <button className=" Filter_button">Barcha anemelar</button>
          <button className=" Filter_button">Yakunlangan Animelar</button>
        </div>
        <button className="flex items-center gap-1 Filter_button1">
          Barchasi <FaChevronRight />
        </button>
      </div>
    </Box>
  );
};

export default Filter;
