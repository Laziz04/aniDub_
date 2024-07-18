import { FaChevronRight } from "react-icons/fa";
import "./section_filter.css";

const Filter = () => {
  return (
    <div className=" container mt-5 ">
      <div className="felx_wrap flex  justify-between w-100">
        <div className="row nefr ">
          <div className="col-4">
            <button className=" Filter_button">Hamma anemelar</button>
          </div>
          <div className="col-4">
            <button className=" Filter_button">Yakunlangan Animelar</button>
          </div>
          <div className="col-4">
            <button className=" Filter_button">Ani Filimlar</button>
          </div>
        </div>
        <button className="flex items-center gap-1 Filter_button1">
          Barchasi <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Filter;
