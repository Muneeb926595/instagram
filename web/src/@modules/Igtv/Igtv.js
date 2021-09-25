import React from "react";

const Igtv = () => {
  return (
    <div
      className="p-4"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        borderRadius: "8px",
        background:
          "linear-gradient(140deg, rgba(228, 62, 104, 1) 0%,  rgba(250, 164, 73, 1) 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          right: "0",
          left: "0",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <p className="font-sans font-semibold text-6xl text-gray-200 text-center ">
          Comming Soon
        </p>
      </div>
    </div>
  );
};

export default Igtv;
