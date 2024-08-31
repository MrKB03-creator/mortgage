import React from "react";

const Results = ({ formData }) => {
  //Importing the formData object from the parent component
  const { currency, mortgageAmount, mortgageTerm, interestRate, mortgageType } =
    formData;

  //Destructuring the formData object
  const curr = currency;
  const amount = mortgageAmount.replace(/,/g, '');
  const term = mortgageTerm;
  const rate = interestRate;
  const type = mortgageType;


  //Function to calculate the monthly payment, total payment, and total interest
  const payment = (amount, term, rate) => {
    rate /= 1200;
    term *= 12;
    const monthlyPayment =
      (amount * (rate * Math.pow(1 + rate, term))) /
      (Math.pow(1 + rate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - amount;
    return {
      monthlyPayment: monthlyPayment.toLocaleString("en", { minimumFractionDigits: 2 , maximumFractionDigits: 2 }),
      totalPayment: totalPayment.toLocaleString("en", { minimumFractionDigits: 2 , maximumFractionDigits: 2 }),
      totalInterest: totalInterest.toLocaleString("en", { minimumFractionDigits: 2 , maximumFractionDigits: 2 }),
    };
  };

  //Destructuring the returned object from the payment function
  const { monthlyPayment, totalPayment, totalInterest } = payment(
    amount,
    term,
    rate
  );

  //Function to return the mortgage type
  const mortgageT = (type) => {
    if (type === "repayment") {
      return monthlyPayment;
    } else if (type === "interestOnly") {
      return totalInterest;
    }
  };

  return (
    <div className="bg-[#133040] w-full h-full rounded-r-xl rounded-bl-[5rem] max-sm:rounded-r-none max-sm:rounded-bl-[0rem]">
      <div className="m-10 h-full ">
        {/* Results */}
        <div className="flex flex-col justify-between h-[20%]">
          <h1 className="text-white text-2xl">Your results</h1>
          <p className="text-slate-400 text-justify text-[14px]">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>
        </div>
        <div className="mt-6">
          <div className="bg-lime h-1 rounded-t-lg"></div>
          <div className=" bg-bgResult rounded-lg p-6 max-sm:rounded-none">
            <div>
              <h2 className="text-slate-400">Your monthly repayments</h2>
              <p className="text-lime text-5xl py-3 max-sm:text-3xl">
                {curr}
                {mortgageT(type)}
              </p>
            </div>
            <div className="w-full bg-slate-500 h-[1px] my-3"></div>
            <h2 className="text-slate-400 pb-3">
              Total you'll repay over the term
            </h2>
            <p className="text-white text-xl">
              {curr}
              {totalPayment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
