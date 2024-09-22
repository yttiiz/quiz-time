import { VariantType, ModelType, definition, SizeType } from "@/components/mod";

export const IconUser = ({
	variant,
	svgSize = "md",
	model = "default",
}: {
	variant: VariantType;
	svgSize?: SizeType;
	model?: ModelType;
}) => {
	const { stroke, size } = definition;
	let className = `${size[svgSize as keyof typeof size]} ${stroke[variant][model]} stroke-2`;

	return (
		<svg
			x="0px"
			y="0px"
			viewBox="0 0 32 32"
			className={className}
		>
			<g>
				<circle
					cx="16"
					cy="16"
					r="10"
				/>
				<circle
					cx="16"
					cy="14"
					r="3"
				/>
				<path d="M16,26a9.94,9.94,0,0,0,6.61-2.51,8,8,0,0,0-13.22,0A9.94,9.94,0,0,0,16,26Z" />
			</g>
		</svg>
	);
};
