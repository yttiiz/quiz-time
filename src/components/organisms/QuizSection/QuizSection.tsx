import { QuizQuestions, QuizSectionPropsType } from "../mod";
import { QuestionType } from "@/services/mod";

export const QuizSection = ({ title, response, id }: QuizSectionPropsType) => {
	return (
		<section
			id={id}
			className="hero-quiz"
		>
			<div className="container grid py-24 px-6 gap-4">
				<h1>{title}</h1>
				<div>
					{response.ok ? (
						<QuizQuestions list={response.data as unknown as QuestionType[]} />
					) : (
						"No items found"
					)}
				</div>
			</div>
		</section>
	);
};
