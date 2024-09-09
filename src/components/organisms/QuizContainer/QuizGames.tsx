import { ErrorMessage, FormSelectQuiz } from "@/components/mod";
import { Fetcher } from "@/utils/mod";

export const QuizGames = async () => {
	const { __NEXT_PRIVATE_ORIGIN: host } = process.env;
	const response = await Fetcher.postData(`${host}/api/json`, {
		file: "select-quiz",
	});

	return (
		<section id="quiz-games">
			<div className="container">
				{response.ok ? (
					<FormSelectQuiz data={response.data} />
				) : (
					<ErrorMessage
						content={{
							FR: "Une erreur est survenue",
							EN: "An Error occured",
						}}
					/>
				)}
			</div>
		</section>
	);
};
