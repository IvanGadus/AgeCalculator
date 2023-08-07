import React, { useState, useEffect } from 'react'
import { isValid, parseISO } from 'date-fns';
import arrow from '../images/icon-arrow.svg';


export default function Form(props) {
  const [dayValue, setDayValue] = useState('')
  const [monthValue, setMonthValue] = useState('')
  const [yearValue, setyearValue] = useState('')
  const [dateValidity, setDateValidity] = useState(true)
  const [wrongDay, setWrongDay] = useState(false)
  const [wrongYear, setWrongYear] = useState(false)
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [emptyDay, setEmptyDay] = useState(false)
  const [emptyMonth, setEmptyMonth] = useState(false)
  const [emptyYear, setEmptyYear] = useState(false)

  useEffect(() => {
    if(dayValue !== '' && monthValue !== '' && yearValue !== '' && 999 < yearValue && yearValue <= currentYear && monthValue < 12){
      setDateValidity(isDateValid())
      if(!dateValidity && (0 < monthValue < 13) && (999 < yearValue <= currentYear)){
        setWrongDay(true)
      }else{
        setWrongDay(false)
      }

    }
  },[dayValue,monthValue,yearValue,dateValidity])

  const handleDayChange = (e) => {
    let value = e.target.value;
    setDayValue(value);
  };

  const handleMonthChange = (e) => {
    let value = e.target.value;
    setMonthValue(value);
  };

  const handleYearChange = (e) => {
    let value = e.target.value;
    setyearValue(value)
  }

  function isDateValid() {
    let dateFormat = yearValue + "-" + ( monthValue < 10 ? '0' + monthValue : monthValue) + "-" + ( dayValue < 10 ? '0' + dayValue : dayValue)
    const parsedDate = parseISO(dateFormat)
    return isValid(parsedDate)
  }

  const checkDay = (e) => {
    (e.target.value === "" || e.target.value === undefined) ? setEmptyDay(true) : setEmptyDay(false)
    dayValue !== '' && setEmptyDay(false)
  }

  const checkMonth = (e) => {
    (e.target.value === "" || e.target.value === undefined) ? setEmptyMonth(true) : setEmptyMonth(false)
    monthValue !== '' && setEmptyMonth(false)
  }

  const checkYear = (e) => {
    (e.target.value === "" || e.target.value === undefined) ? setEmptyYear(true) : setEmptyYear(false)
    yearValue !== '' && setEmptyYear(false)
    setWrongYear(false)
  }

  const checkOldYear = () => {
    yearValue < 1000 ? setWrongYear(true) : setWrongYear(false)
  }

  const className = {
    labelStyle: "font-medium text-[10px] tracking-widest uppercase",
    inputStyle: "appearance-none placeholder-slate-400 w-full bg-transparent focus:outline-none text-base border rounded pl-4 py-2 mt-1 sm:max-w-full focus:border-purple-700 hover:cursor-pointer"
  }

  return (
    <div>
      <div className='flex flex-row justify-between gap-5'>
        <div className='flex flex-1 flex-col max-w-[70px] sm:max-w-none sm:w-20'>
          <label className={`${className.labelStyle} ${(dayValue > 31 || emptyDay || !dateValidity ) && "text-rose-700 "}`}>Day</label>
          <input className={`${className.inputStyle} ${(dayValue > 31 || emptyDay || !dateValidity ) && "border-rose-700"}`} onChange={(e) => {handleDayChange(e); checkDay(e)}} value={dayValue} type="number" max="31" min="1" placeholder='DD'/>
          {(dayValue > 31 || wrongDay) && (<small className='text-rose-700 text-[7px] font-medium italic mt-1 text-center'>Must be a valid date</small>)}
          {emptyDay && (<small className='text-rose-700 text-[7px] font-medium italic mt-1 text-center'>This field is required</small>)}
        </div>

        <div className='flex flex-1 flex-col max-w-[70px] sm:max-w-none sm:w-20'>
          <label className={`${className.labelStyle} ${(monthValue > 12 || emptyMonth || !dateValidity) && "text-rose-700"}`}>Month</label>
          <input className={`${className.inputStyle} ${(monthValue > 12 || emptyMonth || !dateValidity) && "border-rose-700"}`} onChange={(e) => {handleMonthChange(e); checkMonth(e)}} value={monthValue} type="number" max="12" min="1" placeholder='MM'/>
          {monthValue > 12 && (<small className=' text-rose-700 text-[7px] font-medium italic mt-1 text-center'>Must be a valid month</small>)}
          {emptyMonth && (<small className='text-rose-700 text-[7px] font-medium italic mt-1 text-center'>This field is required</small>)}
        </div>

        <div className='flex flex-1 flex-col max-w-[70px] sm:max-w-none sm:w-20'>
          <label className={`${className.labelStyle} ${(yearValue > currentYear || emptyYear || !dateValidity || wrongYear) && "text-rose-700"}`}>Year</label>
          <input className={`${className.inputStyle} ${(yearValue > currentYear || emptyYear || !dateValidity || wrongYear) && "border-rose-700"} ${!dateValidity && "border-rose-700"}`} onChange={(e) => {handleYearChange(e); checkYear(e)}} value={yearValue} type="number" max={currentYear} min="1000" placeholder='YYYY'/>
          {yearValue > currentYear && (<small className='text-rose-700 text-[7px] font-medium italic mt-1 text-center'>Must be in the past</small>)}
          {emptyYear && (<small className='text-rose-700 text-[7px] font-medium italic mt-1 text-center'>This field is required</small>)}
          {wrongYear && (<small className='text-rose-700 text-[7px] font-medium italic mt-1 text-center'>Must be greater than 999</small>)}
        </div>

        <div className='flex-1 flex-col hidden sm:block'></div>
      </div>

      <div>
        <button onClick={(e) => {props.getData({day:dayValue, month:monthValue, year:yearValue, dateValidity:dateValidity}); checkDay(e); checkMonth(e); checkYear(e); checkOldYear() }} className='w-full border-b-2 border-slate-200 relative my-12 flex justify-center sm:block sm:my-7'>
            <img className='absolute -top-[25px] w-[52px] bg-purple-700 active:bg-black rounded-full p-4 sm:right-0' src={arrow} alt="arrow" />
        </button>
      </div>
    </div>
  )
}
