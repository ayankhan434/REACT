import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [allData, setallData] = useState([]);

  async function getData() {
    const response = await axios.get("https://picsum.photos/v2/list");
    console.log(response.data);
    setallData(response.data);
  }

  return (
    <div>
      <button onClick={getData}> GEt Data</button>
      {allData.map(function (elem, idx) {
        return (
          <h1 key={idx}>
            {elem.author} {idx + 1}
          </h1>
        );
      })}
    </div>
  );
};

export default App;
