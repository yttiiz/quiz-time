import {
	VariantType,
	ModelType,
	definition,
	SizeType,
} from "@/components/mod";

export const IconGitlab = ({
	variant,
	svgSize = "md",
	model = "default",
}: {
	variant: VariantType;
	svgSize?: SizeType;
	model?: ModelType;
}) => {
	const { fill, size } = definition;
	let className = `${size[svgSize as keyof typeof size]} ${fill[variant][model]}`;

	return (
		<svg
			x="0px"
			y="0px"
			viewBox="0 0 200 200"
			className={className}
		>
			<path d="M 100 0 A 100 100 0 0 0 0 100 A 100 100 0 0 0 100 200 A 100 100 0 0 0 200 100 A 100 100 0 0 0 100 0 z M 57.101562 35.050781 A 4.9206916 4.9206916 0 0 1 60.861328 36.037109 A 4.8222777 4.8222777 0 0 1 62.492188 38.519531 L 74.900391 76.478516 L 125.14062 76.478516 L 137.54688 38.519531 A 4.9206916 4.9206916 0 0 1 139.17773 36.044922 A 4.9206916 4.9206916 0 0 1 144.80273 35.742188 A 4.78713 4.78713 0 0 1 146.69336 38.019531 L 165.06836 85.976562 L 165.25781 86.460938 A 34.135541 34.135541 0 0 1 153.95508 125.85547 L 153.88477 125.91016 L 125.72461 147 L 111.875 157.48047 L 103.43945 163.84961 A 5.6728545 5.6728545 0 0 1 96.580078 163.84961 L 88.144531 157.48047 L 74.294922 147 L 46.304688 126.03711 L 46.134766 125.91797 L 46.072266 125.86914 A 34.121481 34.121481 0 0 1 34.753906 86.433594 L 34.9375 85.947266 L 53.347656 38.013672 A 4.8293073 4.8293073 0 0 1 55.238281 35.736328 A 4.9206916 4.9206916 0 0 1 57.101562 35.050781 z "></path>
		</svg>
	);
};