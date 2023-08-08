import React, { useState } from "react";
import Form from "./components/Form";
import Age from "./components/Age";

function App() {
  const [date, setDate] = useState({ day: "--", month: "--", year: "--", dateValidity: false });

  const getData = (data) => {
    setDate({ day: data.day, month: data.month, year: data.year, dateValidity: data.dateValidity});
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <div className="m-3 rounded-t-3xl rounded-bl-3xl rounded-br-[90px] bg-white px-6 py-12 sm:w-[450px]">
        <Form getData={getData}></Form>
        <Age year={date.year} month={date.month} day={date.day} dateValidity={date.dateValidity}></Age>
      </div>
    </div>
  );
}

export default App;
