import {
	ErrorMessage,
	FormSelectQuiz,
	SelectOptionsType,
} from "@/components/mod";
import { Fetcher } from "@yttiiz/utils";

export const QuizGames = async () => {
	const { __NEXT_PRIVATE_ORIGIN: host } = process.env;
	const response = await Fetcher.postData<{
		title: string;
		options: SelectOptionsType[];
	}>(
		`${host}/api/json`,
		{
			file: "select-quiz",
		},
		"next",
	);

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
			<div className="video-container">
				<video
					autoPlay
					loop
					muted
				>
					<source
						src="videos/quiz-room.mp4"
						type="video/mp4"
					/>
				</video>
			</div>
		</section>
	);
};
