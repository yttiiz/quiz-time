import { GetStartedButton, HeroPropsType } from "@/components/mod";

export const Hero = ({ title, subtitle, hookContent }: HeroPropsType) => {
	return (
		<div
			id="hero-banner"
			className="py-24 px-6"
		>
			<div className="grid gap-4">
				<h1 className="text-center text-secondary-default">{title}</h1>
				<h2 className="text-center">{subtitle}</h2>
				<p className="text-center">{hookContent}</p>
				<GetStartedButton />
			</div>
		</div>
	);
};
