import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");

  const [num, setNum] = useState(0);
  const getData = async () => {
    const response = await axios.get("https://randomuser.me/api/");
    console.log(response);
    setUsername(
      response.data.results[0].name.first +
        " " +
        response.data.results[0].name.last,
    );
  };

  useEffect(
    function () {
      getData();
    },
    [num],
  );

  return (
    <div>
      <h1>{num}</h1>
      {username}
      <br />
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        Click Here
      </button>
    </div>
  );
};

export default App;
