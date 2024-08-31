import React, { useState } from "react";
import Calculator from "./components/Calculator";
import Results from "./components/Results";
import Empty from "./components/Empty";

function App() {
  //State to check if the form is submitted
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({});

  return (
    <div className="flex flex-col">
      <main className="flex justify-center items-start md:items-center h-[100vh] bg-slate-200 max-md:justify-between max-md:h-full  ">
        <div className="w-[950px] h-[500px] flex flex-col bg-white rounded-xl md:flex-row max-sm:h-full max-sm:w-full max-sm:rounded-none">
          <Calculator
            setIsSubmitted={setIsSubmitted}
            setFormData={setFormData}
          />
          {isSubmitted ? <Results formData={formData} /> : <Empty />}
        </div>
      </main>
      <footer className="bg-slate-100 text-black text-center py-2">
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. 
      Coded by <a href="#">Kurt Badillo</a>.
      </footer>
    </div>
  );
}

export default App;
