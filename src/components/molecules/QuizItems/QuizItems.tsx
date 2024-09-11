export const QuizItems = ({ questions }: { questions: string[] }) => {
	return (
		<ul>
			{questions.map((question, key) => (
				<li key={key + (Math.random() + 1) * 1000}>{question}</li>
			))}
		</ul>
	);
};
