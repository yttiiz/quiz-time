import { MainLayout, QuizSection } from "@/components/mod";
import { Fetcher } from "@yttiiz/utils";
import style from "../quiz.module.css";

export default async function Javascript() {
	const { __NEXT_PRIVATE_ORIGIN: host } = process.env;
	const response = await Fetcher.postData(
		host + "/api/mongodb",
		{
			quiz: "rust",
		},
		"next",
	);

	return (
		<MainLayout>
			<QuizSection
				id={style["hero-rust"]}
				title="Rust Quiz"
				response={response}
			/>
		</MainLayout>
	);
}
