import { QuizQuestions, QuizSectionPropsType } from "../mod";
import { QuestionSchemaType } from "@/services/mod";

export const QuizSection = ({ title, response, id }: QuizSectionPropsType<QuestionSchemaType[]>) => {
	return (
		<section
			id={id}
			className="hero-quiz"
		>
			<div className="container grid py-24 px-6 gap-4">
				<h1>{title}</h1>
				<div>
					{response.ok ? (
						<QuizQuestions
							list={response.data }
						/>
					) : (
						"No items found"
					)}
				</div>
			</div>
		</section>
	);
};
