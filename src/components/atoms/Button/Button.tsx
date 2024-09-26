"use client";

import { ButtonPropsType } from "../mod";
import { definition } from "@/components/definition";

export const Button = (
	{
		textContent,
		type = "button",
		radius = "md",
		spacing = "2",
		variant = "primary",
		className,
		onlyBorder = false,
		onClick,
		dataBind,
	}: ButtonPropsType & {
		dataBind?: string;
	},
	key?: string,
) => {
	const {
		background,
		border,
		text,
		"border-radius": borderRadius,
		padding,
	} = definition;

	let borderOrBackground = "";

	if (onlyBorder) {
		borderOrBackground = `border-2 ${
			border[variant].default
		} ${border[variant].hover} ${text[variant].default}`;
	} else {
		borderOrBackground = `${
			background[variant].default
		} ${background[variant].hover} ${text[variant].content}`;
	}

	const buttonClassName = `${padding[spacing]} ${borderOrBackground}${
		className ? ` ${className}` : ""
	}${radius ? ` ${borderRadius[radius]}` : ""}`;

	return dataBind ? (
		<button
			data-bind={dataBind}
			key={key}
			type={type}
			className={buttonClassName}
			onClick={onClick}
		>
			{textContent}
		</button>
	) : (
		<button
			key={key}
			type={type}
			className={buttonClassName}
			onClick={onClick}
		>
			{textContent}
		</button>
	);
};
