import { VariantType, ModelType, definition, SizeType } from "@/components/mod";

export const IconUnlocked = ({
	variant,
	svgSize = "md",
	model = "default",
}: {
	variant: VariantType;
	svgSize?: SizeType;
	model?: ModelType;
}) => {
	const { stroke, size } = definition;
	let className = `${size[svgSize as keyof typeof size]} ${stroke[variant][model]}`;

	return (
		<svg
			x="0px"
			y="0px"
			viewBox="0 0 32 32"
			className={className}
			style={{ strokeWidth: "1px" }}
		>
			<g>
				<rect
					x="8"
					y="13"
					width="16"
					height="13"
					rx="4"
				/>
				<path d="M20.87,9A4,4,0,0,0,17,6H15a4,4,0,0,0-4,4v3" />
				<line
					x1="16"
					y1="18"
					x2="16"
					y2="20"
				/>
			</g>
		</svg>
	);
};
