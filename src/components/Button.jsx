import React from "react";

function Button({ text }) {
  return (
    <button className="px-10 py-3 font-medium text-white bg-transparent border border-white hover:bg-white hover:text-black transition  duration-500">
      {text}
    </button>
  );
}

export default Button;
