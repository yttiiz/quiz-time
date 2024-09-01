import { SizeType, SpacingType, VariantType } from "../types";

type CommonPropsType = {
	variant?: VariantType;
	className?: string;
};

export type ButtonPropsType = CommonPropsType & {
	textContent: string;
	fontSize?: SizeType;
	radius?: SizeType;
	spacing?: SpacingType;
};

export type LogoPropsType = CommonPropsType;

export type NavbarItemPropsType = {
	key: string;
	textContent: string;
	url: string;
};