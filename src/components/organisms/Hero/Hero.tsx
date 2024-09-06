import { GetStartedButton, HeroPropsType } from "@/components/mod";

export const Hero = ({ title, subtitle, hookContent }: HeroPropsType) => {
	return (
		<div
			id="hero-banner"
		>
			<div className="container grid py-24 px-6 gap-4">
				<h1 className="text-center text-secondary-default">{title}</h1>
				<h2 className="text-center">{subtitle}</h2>
				<p className="text-center">{hookContent}</p>
				<GetStartedButton />
			</div>
		</div>
	);
};
