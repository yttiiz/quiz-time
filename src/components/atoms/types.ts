import { MouseEventHandler } from "react";
import { SizeType, SpacingType, VariantType } from "../types";

type CommonPropsType = {
	variant?: VariantType;
	className?: string;
};

export type ButtonPropsType = CommonPropsType & {
	textContent: string;
	radius?: SizeType;
	spacing?: SpacingType;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type LogoPropsType = Omit<CommonPropsType, "variant">;

export type NavbarItemPropsType = {
	key: string;
	textContent: string;
	url: string;
};