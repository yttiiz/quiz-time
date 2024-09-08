import { Select, SelectOptionsType } from "@/components/mod";
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
					<form action="">
						<h3>{response.data.title}</h3>
						<Select
							name="select-quiz"
							options={response.data.options as unknown as SelectOptionsType[]}
							placeholder="Choisissez votre thème..."
						/>
					</form>
				) : (
					<div>
						{globalThis.navigator.language === "fr-FR"
							? "Une erreur est survenue."
							: "An Error occured."}
					</div>
				)}
			</div>
		</section>
	);
};
