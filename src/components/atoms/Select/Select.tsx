"use client";

export const Select = ({
	name,
	options,
	placeholder,
	width = "full",
}: {
	name: string;
	options: {value: string, label: string }[];
	placeholder: string;
	width?: "full" | "content";
}) => {
	const containerWClassname = `select-container ${width === "full" ? "w-full" : "w-max"}`;
	
	return (
		<div className={containerWClassname}>
			<select name={name}>
				<option value={""}>{placeholder}</option>
				{options.map(({ value, label }) => (
					<option
						key={((Math.random() + 1) * 1000).toFixed()}
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
