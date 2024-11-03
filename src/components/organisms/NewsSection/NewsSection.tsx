import { NewsDetails } from "../mod";

export const NewsSection = ({ id }: { id: string }) => {
	return (
		<section
			id={id}
			className="news flex"
		>
			<div className="container grid h-full items-center py-24 md:px-6">
				<NewsDetails />
			</div>
		</section>
	);
};
