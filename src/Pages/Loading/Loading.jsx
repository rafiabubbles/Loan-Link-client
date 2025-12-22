import React from "react";
import { ClimbingBoxLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="min-h-screen  flex justify-center items-center  jost">
      <div className="">
        <ClimbingBoxLoader size={30} color="#64B5F6" />
      </div>
    </div>
  );
};

export default Loading;
