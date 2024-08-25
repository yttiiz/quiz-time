import { SizeType, SpacingType, VariantType } from "../types";

export type ButtonPropsType = {
	textContent: string;
	fontSize?: SizeType;
	radius?: SizeType;
	spacing?: SpacingType;
	variant?: VariantType;
	className?: string;
};
