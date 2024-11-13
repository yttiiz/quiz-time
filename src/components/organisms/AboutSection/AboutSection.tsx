import { AboutDetails } from "../mod";

export const AboutSection = ({ id }: { id: string }) => {
	return (
		<section id={id}>
			<div className="container grid gap-6 h-full items-center py-24 md:px-6">
				<AboutDetails />
			</div>
		</section>
	);
};
