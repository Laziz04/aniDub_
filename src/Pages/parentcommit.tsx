import React, { useState } from "react";
import Filter from "./filter";
import Cards from "./cards";

const ParentComponent: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  return (
    <div>
      <Filter onFilterChange={setFilter} />
      <Cards filter={filter} />
    </div>
  );
};

export default ParentComponent;
