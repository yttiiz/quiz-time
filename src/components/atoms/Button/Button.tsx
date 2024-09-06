"use client";

import { ButtonPropsType } from "../mod";
import { definition } from "@/components/definition";

export const Button = ({
	textContent,
	radius = "sm",
	spacing = "2",
	variant = "primary",
	className,
	onClick,
}: ButtonPropsType) => {
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
			className={buttonClassName}
			onClick={onClick}
		>
			{textContent}
		</button>
	);
};
