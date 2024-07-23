import { FaChevronRight } from "react-icons/fa";
import "./section_filter.css";

const Filter = () => {
  return (
    <div className="container mx-auto mt-3">
      <div className="flex flex-wrap justify-between items-center w-full">
        <div className="w-full md:w-auto flex flex-wrap justify-center md:justify-start">
          <div className="p-1">
            <button className="Filter_button ">Barcha animelar</button>
          </div>
          <div className="w-full md:w-1/3 p-1">
            <button className="Filter_button w-full">
              Yakunlangan Animelar
            </button>
          </div>
          <div className="w-full md:w-1/3 p-1">
            <button className="Filter_button w-full">Ani Filimlar</button>
          </div>
        </div>
        <div className="w-full md:w-auto mt-2 md:mt-0">
          <button className="flex items-center gap-1 Filter_button1 w-full md:w-auto">
            Barchasi <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
