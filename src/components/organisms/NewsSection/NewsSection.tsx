import { Cheerio } from "@/utils/mod";
import Image from "next/image";

export const NewsSection = async () => {
	const data = await Cheerio.getDataFrom(
		"https://rattrapages-actu.epjt.fr/",
		".et_pb_slide .et_pb_container",
	);

	return (
		<section className="news flex">
			<div className="container grid h-full items-center">
				{data ? (
					Object.keys(data).map((key) => {
						const {
							title,
							image: { src, height, width },
						} = data[key];
						
						return (
							<div key={key}>
								<h2>{title}</h2>
								<Image
									src={src}
									alt={src}
									height={+height}
									width={+width}
									priority={false}
								/>
							</div>
						);
					})
				) : (
					<div>No data</div>
				)}
			</div>
		</section>
	);
};
