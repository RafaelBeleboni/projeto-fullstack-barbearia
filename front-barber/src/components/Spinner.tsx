import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-300"></div>
    </div>
  );
};

export default Spinner;
