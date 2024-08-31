import React from "react";
import { empty } from "../assets/images";

const Empty = () => {
  return (
    <div className="bg-[#133040] w-full h-full rounded-r-xl rounded-bl-[5rem] max-sm:rounded-bl-none max-sm:rounded-r-none">
      <div className="m-10 h-full">
        <img src={empty} alt="empty" className="w-[50%] h-[50%] mx-auto" />
        <h1 className="text-white text-2xl text-center">
        Results shown here
        </h1>
        <p className="text-slate-400 text-[14px] text-center mt-3">
          Complete the form and click “calculate repayments” to see what your
          monthly repayments would be.
        </p>
      </div>
    </div>
  );
};

export default Empty;
