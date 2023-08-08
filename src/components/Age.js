import React, { useEffect, useState } from 'react'
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns'

export default function Age(props) {
    const [age, setAge] = useState("")
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const purpleColor = "text-purple-700";

    useEffect(() => {
      calculateAge()
    },[props])
    

    const calculateAge = () => {
      if(props.year !== "" && props.month !== "" && props.day !== "" && props.year > 999 && props.year <= currentYear && props.month > 0 && props.month < 13 && props.dateValidity) {
        
        console.log("Age calculation")

        let deffInDays = differenceInDays(
          new Date(props.year, props.month-1, currentDate.getDate()),
          new Date(props.year,props.month-1,props.day)
        )

        let diffInMonths = differenceInMonths(
          new Date(currentDate),
          new Date(props.year,props.month-1,props.day)
        )
        
        const diffInYears = differenceInYears(
          new Date(currentDate),
          new Date(props.year,props.month-1,props.day)
        )

        if(deffInDays<0){
          deffInDays = differenceInDays(
            new Date(props.year, props.month, currentDate.getDate()),
            new Date(props.year,props.month-1,props.day)
          )
        }

        setAge({year: diffInYears, month: diffInMonths%12, day: deffInDays})
        // console.log(diffInYears, diffInMonths, deffInDays)
      }
    }


  return (
    <div>
        <p className='text-5xl italic font-black'><span className={purpleColor}>{isNaN(age.year) ? "--" : age.year}</span> years</p>
        <p className='text-5xl italic font-black'><span className='text-purple-700'>{isNaN(age.month) ? "--" : age.month}</span> months</p>
        <p className='text-5xl italic font-black'><span className='text-purple-700'>{isNaN(age.day) ? "--" : age.day}</span> days</p>
    </div>
  )
}
