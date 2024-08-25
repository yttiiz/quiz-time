"use client";

import { ButtonPropsType } from "../mod";
import { definition } from "@/components/definition";

export const Button = ({
	textContent,
	fontSize = "xl",
	radius = "sm",
	spacing = "2",
	variant = "primary",
	className,
}: ButtonPropsType) => {
	const {
		background,
		text,
		"font-size": size,
		"border-radius": borderRadius,
		padding,
	} = definition;

	const buttonClassName = `${padding[spacing]} ${size[fontSize]} ${
		background[variant].default
	} ${background[variant].hover} ${text[variant].content}${
		className ? ` ${className}` : ""
	}${radius ? ` ${borderRadius[radius]}` : ""}`;

	return <button className={buttonClassName}>{textContent}</button>;
};
