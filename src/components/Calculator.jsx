import React, { useState, useRef, useEffect } from "react";
import { Menu, MenuItem, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { calculatorImg } from "../assets/images";

const Calculator = ({ setIsSubmitted, setFormData }) => {
  //Input fields Values
  const formRef = useRef(null);
  const [currency, setCurrency] = useState("$");
  const mortgageAmount = useRef(null);
  const mortgageTerm = useRef(null);
  const interestRate = useRef(null);
  const [mortgageType, setMortgageType] = useState("");

  //Validation
  const [isPushed, setIsPushed] = useState(false);

  useEffect(() => {
    if (mortgageAmount.current) {
      const handleFocus = (event) => {
        event.target.select();
      };

      const handleKeyUp = (event) => {
        let value = event.target.value.replace(/\D/g, ""); // Remove all non-digit characters
        if (value.length > 2) {
          value = value.slice(0, -2) + "." + value.slice(-2); // Add decimal point before the last two digits
        }
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas for thousands
        event.target.value = value;
      };

      const inputElement = mortgageAmount.current;
      inputElement.addEventListener("focus", handleFocus);
      inputElement.addEventListener("keyup", handleKeyUp);

      return () => {
        inputElement.removeEventListener("focus", handleFocus);
        inputElement.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, []);

  //Focus change input fields
  const [isFocusedAmount, setIsFocusedAmount] = useState(false);
  const [isFocusedTerm, setIsFocusedTerm] = useState(false);
  const [isFocusedInterest, setIsFocusedInterest] = useState(false);

  //Mortgage Type choosing
  const handleMortgageTypeChange = (event) => {
    setMortgageType(event.target.value);
  };

  //Form Submission Function
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = formRef.current.querySelectorAll("input");
    let allValid = true;

    // Validate mortgage amount
    if (!mortgageAmount.current.value.trim()) {
      mortgageAmount.current.classList.add("invalid");
      allValid = false;
    } else {
      mortgageAmount.current.classList.remove("invalid");
    }

    // Validate mortgage term
    if (!mortgageTerm.current.value.trim()) {
      mortgageTerm.current.classList.add("invalid");
      allValid = false;
    } else {
      mortgageTerm.current.classList.remove("invalid");
    }

    // Validate interest rate
    if (!interestRate.current.value.trim()) {
      interestRate.current.classList.add("invalid");
      allValid = false;
    } else {
      interestRate.current.classList.remove("invalid");
    }

    // Validate mortgage type
    if (!mortgageType) {
      allValid = false;
    }

    if (allValid) {
      setIsSubmitted(true);
      setIsPushed(false);
      setFormData({
        currency: currency,
        mortgageAmount: mortgageAmount.current.value,
        mortgageTerm: mortgageTerm.current.value,
        interestRate: interestRate.current.value,
        mortgageType: mortgageType,
      });
    } else {
      setIsSubmitted(false);
      setIsPushed(true);
    }
  };

  //Clear Button Function
  const clearButton = () => {
    formRef.current.reset();
    setIsSubmitted(false);
    setMortgageType(''); 
  };

  return (
    <form className="w-full h-full" ref={formRef} onSubmit={handleSubmit}>
      <div className="p-10 flex flex-col justify-between h-[100%] text-[14px] max-sm:p-8 ">
        <div className="flex flex-row justify-between items-center text-center max-sm:flex-col ">
          {/* Header with title and clear button */}
          <h1 className="text-[1.4rem] font-bold max-sm:text-[1.5rem]">
            Mortgage Calculator
          </h1>
          <p
            className="text-gray-400 underline cursor-pointer hover:text-gray-600 max-sm:mt-1 max-sm:mb-2 max-sm:w-full max-sm:text-left max-sm:ml-5"
            onClick={clearButton}
          >
            Clear all
          </p>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col justify-between h-full mt-3">
          {/* Mortgage Amount field with currency menu */}
          <fieldset>
            <legend className="text-slate-500 mb-1" htmlFor="mortgageAmount">
              Mortgage Amount
            </legend>
            <label
              className={`mb-1 border border-gray-200 rounded-md justify-center items-center flex text-center max-sm:w-full ${
                isFocusedAmount ? "border-lime border-2" : ""
              } 
              ${
                isPushed && mortgageAmount.current?.value.trim() === ""
                  ? "border-red"
                  : "border-gray-200"
              }`}
            >
              <Menu
                as="div"
                className="relative inline-block text-left w-[50px] border-0 focus:ring-0 focus:outline-none "
              >
                <div className="flex flex-row">
                  <MenuButton
                    className={`inline-flex w-[50px] justify-center gap-x-1.5 rounded-sm  px-3 py-2 text-[.8rem] font-semibold text-gray-900 shadow-sm ring-0 ring-inset ${
                      isPushed && mortgageAmount.current?.value.trim() === ""
                        ? "bg-red text-white"
                        : isFocusedAmount
                        ? "bg-lime"
                        : "bg-slate-200"
                    }`}
                    onFocus={() => setIsFocusedAmount(true)}
                    onBlur={() => setIsFocusedAmount(false)}
                  >
                    <span>{currency}</span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 h-5 w-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-14 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm `}
                        onClick={() => setCurrency("$")}
                      >
                        $
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => setCurrency("€")}
                      >
                        €
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => setCurrency("£")}
                      >
                        £
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
              <input
                id="mortgageAmount"
                type="text"
                min={0}
                className="w-[100%]  border-0 focus:ring-0 focus:outline-none pl-2 focus-visible:ring-0 focus-visible:outline-none "
                placeholder="Enter amount"
                ref={mortgageAmount}
                onFocus={() => setIsFocusedAmount(true)}
                onBlur={() => setIsFocusedAmount(false)}
              ></input>
            </label>
            <span
              className={`${
                isPushed && mortgageAmount.current?.value.trim() === ""
                  ? "visible"
                  : "invisible"
              } text-red text-[.7rem]`}
            >
              This field is required.
            </span>
          </fieldset>

          {/* Mortgage Term and Interest Rate fields */}
          <div className="flex flex-col my-1 sm:flex-row max-sm:my-0">
            <fieldset className="pr-[3%] w-[50%] max-sm:w-full max-sm:pr-0">
              <legend className="text-slate-500">Mortgage Term</legend>

              <label
                className={`mt-2 flex justify-center items-center border rounded-md h-10 w-full 
              ${isFocusedTerm ? "border-lime border-2" : ""}
              ${
                isPushed && mortgageTerm.current?.value.trim() === ""
                  ? "border-red"
                  : "border-gray-200"
              }`}
              >
                <input
                  id="mortgageTerm"
                  type="number"
                  className="w-full pl-2 border-0 focus:ring-0 focus:outline-none peer"
                  placeholder="Enter term"
                  ref={mortgageTerm}
                  min={0}
                  max={100}
                  onFocus={() => setIsFocusedTerm(true)}
                  onBlur={() => setIsFocusedTerm(false)}
                ></input>
                <p
                  className={`h-full p-2 rounded-r-sm w-20 flex justify-center items-center 
                    ${
                      isPushed && mortgageTerm.current?.value.trim() === ""
                        ? "bg-red text-white"
                        : isFocusedTerm
                        ? "bg-lime"
                        : "bg-slate-200"
                    }`}
                >
                  Years
                </p>
              </label>
              <span
                className={`my-2 ${
                  isPushed && mortgageTerm.current?.value.trim() === ""
                    ? "visible"
                    : "invisible"
                } text-red text-[.7rem]`}
              >
                This field is required.
              </span>
            </fieldset>

            <fieldset className="w-[50%] max-sm:w-full">
              <legend className="text-slate-500">Interest Rate</legend>
              <label
                className={`mt-2 flex  justify-center items-center border rounded-md h-10 w-full ${
                  isFocusedInterest ? "border-lime border-2" : ""
                }
              ${
                isPushed && interestRate.current?.value.trim() === ""
                  ? "border-red "
                  : "border-gray-200"
              }`}
              >
                <input
                  id="interestRate"
                  type="number"
                  min={0}
                  max={100}
                  step=".01"
                  className="w-full pl-2 border-0 focus:ring-0 focus:outline-none "
                  placeholder="Enter term"
                  ref={interestRate}
                  onFocus={() => setIsFocusedInterest(true)}
                  onBlur={() => setIsFocusedInterest(false)}
                ></input>
                <p
                  className={` h-full p-2 rounded-r-sm w-10 flex justify-center items-center 
                ${
                  isPushed && interestRate.current?.value.trim() === ""
                    ? "bg-red text-white"
                    : isFocusedInterest
                    ? "bg-lime"
                    : "bg-slate-200"
                }`}
                >
                  %
                </p>
              </label>
              <span
                className={`${
                  isPushed && interestRate.current?.value.trim() === ""
                    ? "visible"
                    : "invisible"
                } text-red text-[.7rem]`}
              >
                This field is required.
              </span>
            </fieldset>
          </div>

          {/* Mortgage Type Radio Buttons */}
          <fieldset className="flex flex-col justify-between my-1">
            <legend className="text-slate-500 pb-2">Mortgage Type</legend>
            <div className="flex flex-col gap-2 mb-1">
              <label className="has-[:checked]:bg-yellow-50  has-[:checked]:border-lime has-[:checked]:border-2 p-2 rounded-md flex justify-start items-center border border-black-20 cursor-pointer ">
                <input
                  className="mr-2 cursor-pointer accent-lime"
                  type="radio"
                  id="repayment"
                  name="mortgageType"
                  value="repayment"
                  checked={mortgageType === "repayment"}
                  onChange={handleMortgageTypeChange}
                />
                Repayment
              </label>

              <label className="has-[:checked]:bg-yellow-50  has-[:checked]:border-lime has-[:checked]:border-2 p-2 rounded-md flex justify-start items-center border border-black-20 cursor-pointer ">
                <input
                  className="mr-2 cursor-pointer accent-lime"
                  type="radio"
                  id="interestOnly"
                  name="mortgageType"
                  value="interestOnly"
                  checked={mortgageType === "interestOnly"}
                  onChange={handleMortgageTypeChange}
                />
                Interest Only
              </label>
            </div>
            <span
              className={`my-1 ${
                isPushed &&
                (!Array.from(
                  formRef.current.querySelectorAll('input[name="mortgageType"]')
                ).some((radio) => radio.checked) ||
                  interestRate.current?.value.trim() === "")
                  ? "visible"
                  : "invisible"
              } text-red text-[.7rem] max-sm:text`}
            >
              <span className="text-red">This field is required.</span>
            </span>
          </fieldset>
        </div>

        {/* Calculate Button */}
        <div className="flex justify-start mt-1">
          <button
            type="submit"
            className="bg-lime text-slate-700 w-[70%] h-10 rounded-full flex justify-center items-center gap-2 weight-bold cursor-pointer"
          >
            <img
              src={calculatorImg}
              alt="calculator"
              className="w-4 h-4 inline-block mr-2"
            />
            Calculate Repayment
          </button>
        </div>
      </div>
    </form>
  );
};

export default Calculator;
