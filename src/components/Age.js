import React, { useEffect, useState } from "react";
import {
	differenceInDays,
	differenceInMonths,
	differenceInYears,
} from "date-fns";

export default function Age(props) {
	const [age, setAge] = useState("");
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();

	const purpleColor = "text-purple-700";

	useEffect(() => {
		calculateAge();
	}, [props]);

	const calculateAge = () => {
		if (
			props.year !== "" &&
			props.month !== "" &&
			props.day !== "" &&
			props.year > 999 &&
			props.year <= currentYear &&
			props.month > 0 &&
			props.month < 13 &&
			props.dateValidity
		) {
			console.log("Age calculation");
			console.log(props.year, props.month, props.day);

			// Formátovanie dátumu, aby bol vždy vo formáte YYYY-MM-DD
			const birthDate = new Date(
				parseInt(props.year, 10),
				parseInt(props.month, 10) - 1,
				parseInt(props.day, 10)
			);
			const today = new Date(currentDate);

			let years = today.getFullYear() - birthDate.getFullYear();
			let months = today.getMonth() - birthDate.getMonth();
			let days = today.getDate() - birthDate.getDate();

			// Úprava mesiacov a dní, ak sú záporné
			if (days < 0) {
				months -= 1;
				days += new Date(
					today.getFullYear(),
					today.getMonth(),
					0 // Predchádzajúci mesiac
				).getDate();
			}

			if (months < 0) {
				years -= 1;
				months += 12;
			}

			// Nastavenie veku
			setAge({ year: years, month: months, day: days });
			console.log("Age:", { year: years, month: months, day: days });
		}
	};

	return (
		<div>
			<p className="text-5xl italic font-black">
				<span className={purpleColor}>{isNaN(age.year) ? "--" : age.year}</span>{" "}
				years
			</p>
			<p className="text-5xl italic font-black">
				<span className="text-purple-700">
					{isNaN(age.month) ? "--" : age.month}
				</span>{" "}
				months
			</p>
			<p className="text-5xl italic font-black">
				<span className="text-purple-700">
					{isNaN(age.day) ? "--" : age.day}
				</span>{" "}
				days
			</p>
		</div>
	);
}
