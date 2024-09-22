import { MainLayout, QuizSection } from "@/components/mod";
import { Fetcher } from "@yttiiz/utils";
import style from "../quiz.module.css";

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params;
	const title = `${slug[0].toLocaleUpperCase()}${slug.slice(1)} Quiz`;
	
	const { __NEXT_PRIVATE_ORIGIN: host } = process.env;
	const response = await Fetcher.postData(
		host + "/api/mongodb/quiz",
		{
			quiz: slug,
		},
		"next",
	);

	return (
		<MainLayout>
			<QuizSection
				id={style[`hero-${slug}`]}
				title={title}
				response={response}
			/>
		</MainLayout>
	);
}
