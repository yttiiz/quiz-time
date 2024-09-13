import { MainLayout, QuizQuestions } from "@/components/mod";
import { QuestionType } from "@/services/mod";
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
			<section
				id={style["hero-js"]}
				className="hero-quiz"
			>
				<div className="container grid py-24 px-6 gap-4">
					<h1>Javascript Quiz</h1>
					<div>
						{response.ok ? (
							<QuizQuestions
								list={response.data as unknown as QuestionType[]}
							/>
						) : (
							"No items found"
						)}
					</div>
				</div>
			</section>
		</MainLayout>
	);
}
