import React from "react";

const App = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("from submitted");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input type="text" placeholder="Enter Name" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;
3;
