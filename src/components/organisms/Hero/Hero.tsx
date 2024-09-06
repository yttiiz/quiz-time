export const Hero = ({ title }: { title: string }) => {
	return (
		<div
			id="hero-banner"
			className="pt-24"
		>
			<h1 className="text-center">{title}</h1>
		</div>
	);
};
