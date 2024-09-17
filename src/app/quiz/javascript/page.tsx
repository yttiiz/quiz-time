import { MainLayout, QuizSection } from "@/components/mod";
import { Fetcher } from "@yttiiz/utils";
import style from "../quiz.module.css";

export default async function Javascript() {
	const { __NEXT_PRIVATE_ORIGIN: host } = process.env;
	const response = await Fetcher.postData(
		host + "/api/mongodb",
		{
			quiz: "javascript",
		},
		"next",
	);

	return (
		<MainLayout>
			<QuizSection
				id={style["hero-js"]}
				title="Javascript Quiz"
				response={response}
			/>
		</MainLayout>
	);
}
