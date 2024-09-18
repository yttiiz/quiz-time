import { MouseEventHandler } from "react";
import { SizeType, SpacingType, VariantType } from "../types";

type CommonPropsType = {
	variant?: VariantType;
	className?: string;
};

export type ButtonPropsType = CommonPropsType & {
	textContent: string;
	type?: "button" | "submit" | "reset";
	radius?: SizeType;
	spacing?: SpacingType;
	onlyBorder?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type LogoPropsType = Omit<CommonPropsType, "variant">;

export type NavbarItemPropsType = {
	key: string;
	textContent: string;
	url: string;
};

export type SelectOptionsType = {
	value: string;
	label: string;
};

export type SelectPropsType = {
	name: string;
	options: SelectOptionsType[];
	placeholder: string;
	width?: "full" | "content";
};