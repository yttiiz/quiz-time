import { VariantType, ModelType, definition, SizeType } from "@/components/mod";

export const IconOnOff = ({
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
    width="96"
    height="96"
    viewBox="0 0 96 96"
    xmlnsXlink="http://www.w3.org/1999/xlink"
		className={className}
  >
    <path d="m46.5,93.186c-20.712,0-37.5-16.791-37.5-37.5 0-15.945 9.969-29.532 24-34.953v13.347c-7.197,4.509-12,12.486-12,21.606 0,14.082 11.418,25.5 25.5,25.5s25.5-11.418 25.5-25.5c0-7.788-3.498-14.745-9-19.425v-14.208c12.429,6.108 21,18.852 21,33.636 0,20.709-16.791,37.497-37.5,37.497zm1.5-42c-3.312,0-6-2.688-6-6v-33.372c0-3.312 2.688-6 6-6s6,2.688 6,6v33.375c0,3.312-2.688,5.997-6,5.997z"/>
  </svg>
	);
};
