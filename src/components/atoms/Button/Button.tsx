"use client";

import { ButtonPropsType } from "../mod";
import { definition } from "@/components/definition";

export const Button = (
	{
		textContent,
		type = "button",
		radius = "sm",
		spacing = "2",
		variant = "primary",
		className,
		onClick,
	}: ButtonPropsType,
	key?: string,
) => {
	const {
		background,
		text,
		"border-radius": borderRadius,
		padding,
	} = definition;

	const buttonClassName = `${padding[spacing]} ${
		background[variant].default
	} ${background[variant].hover} ${text[variant].content}${
		className ? ` ${className}` : ""
	}${radius ? ` ${borderRadius[radius]}` : ""}`;

	return (
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
