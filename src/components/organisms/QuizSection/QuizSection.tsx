import { ErrorMessage, QuizQuestions } from "@/components/client.mod";
import { QuizSectionPropsType } from "../mod";
import { QuestionSchemaType } from "@/services/mod";

export const QuizSection = ({
	title,
	response,
	id,
}: QuizSectionPropsType<QuestionSchemaType[]>) => {
	return (
		<section
			id={id}
			className="hero-quiz"
		>
			<div className="container grid py-24 md:px-6 gap-4">
				<h1>{title}</h1>
				<div>
					{response.ok ? (
						<QuizQuestions list={response.data} />
					) : (
						<ErrorMessage
							variant="primary"
							content={{
								FR: "Aucun élément trouvé. Veuillez réessayer ultérieurement",
								EN: "No items found. Please retry later",
							}}
						/>
					)}
				</div>
			</div>
		</section>
	);
};
