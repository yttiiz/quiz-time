import { Button, QuizItems } from "@/components/mod";
import { QuestionType } from "@/services/mod";

export const QuizQuestions = ({ list }: { list: QuestionType[] }) => {
	return (
		<>
			<ul>
				{list.map(({ question }, index) => (
					<li key={index + (Math.random() + 1) * 1000}>
						<h3>{question.title}</h3>
						<QuizItems questions={question.propositions} />
					</li>
				))}
			</ul>
			<Button
				type="button"
				textContent="Suivant"
			/>
		</>
	);
};
