import { Select } from "@/components/mod";

export const QuizGames = ({ content }: { content: string }) => {
	return (
		<section id="quiz-games">
			<div className="container">
				<form action="">
					<h3>{content}</h3>
					<Select
						name="quiz-select"
						options={[
							{ value: "items1", label: "items1" },
							{ value: "items2", label: "items2" },
							{ value: "items3", label: "items3" },
						]}
						placeholder="Choisissez votre thème..."
					/>
				</form>
			</div>
		</section>
	);
};
