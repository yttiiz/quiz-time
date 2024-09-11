import { MainLayout, QuizQuestions } from "@/components/mod";
import { QuestionType } from "@/services/mod";
import { Fetcher } from "@yttiiz/utils";

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
			<section id="hero-js">
				<div className="container">
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
