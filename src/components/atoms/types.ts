import { FormEventHandler, HTMLInputTypeAttribute, MouseEventHandler, ReactNode } from "react";
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

export type ItemType = {
	textContent: string;
	url: string;
	isFormConnexion?: boolean;
};

export type NavbarItemPropsType = ItemType & {
	key: string;
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

export type InputPropsType = {
	value: string;
	label: string;
	name?: string;
	type?: HTMLInputTypeAttribute;
	required?: boolean;
	leadingIcon?: ReactNode;
	trailingIcon?: ReactNode;
	feedbackMessage?: string;
	onInput: FormEventHandler<HTMLInputElement>;
	onClickPasswordButton?: () => void;
};