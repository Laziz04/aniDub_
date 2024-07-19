import { FaChevronRight } from "react-icons/fa";
import "./section_filter.css";
import { Box } from "@mui/material";

const Filter = () => {
  return (
    <Box className=" mt-14 respon">
      <div className=" flex items-center gap-3 justify-between ">
        <div className="flex gap-3 ">
          <button className=" Filter_button">Hamma anemelar</button>
          <button className=" Filter_button">Yakunlangan Animelar</button>
          <button className=" Filter_button">Ani Filimlar</button>
        </div>
        <button className="flex items-center gap-1 Filter_button1">
          Barchasi <FaChevronRight />
        </button>
      </div>
    </Box>
  );
};

export default Filter;
