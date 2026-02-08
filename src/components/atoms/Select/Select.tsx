"use client";

import { SelectPropsType } from "../types";

export const Select = ({
	name,
	options,
	placeholder,
	width = "full",
}: SelectPropsType) => {
	const containerWClassname = `select-container ${width === "full" ? "w-full" : "w-max"}`;

	return (
		<div className={containerWClassname}>
			<select name={name}>
				<option value={""}>{placeholder}</option>
				{options.map(({ value, label }) => (
					<option
						key={value}
						value={value}
					>
						{label}
					</option>
				))}
			</select>
			<span className="arrow"></span>
		</div>
	);
};
