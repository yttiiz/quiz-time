"use server";
import { Fetcher } from "@yttiiz/utils";

export const selectQuizServerAction = async (
	prevState: { message: string },
	formData: FormData,
) => {
	const quizSelected = formData.get("select-quiz");
	const messageId = ((Math.random() + 1) * 1000).toFixed();
	const messageItemNotSelected = "No item selected - id: " + messageId;
	
	if (!quizSelected || prevState.message === messageItemNotSelected) {
		return { message: messageItemNotSelected }
	};
	
	const { __NEXT_PRIVATE_ORIGIN: host } = process.env;
	const response = await Fetcher.getData(
		host + "/api/mongodb",
	);

	if (response.ok) {
		for (const item of response.data as unknown as any[]) {
			console.log(item.question.title);
			// Implements logic here.
		}

	} else {
		console.log(response.message);
		// Implements logic here.
	}

	return { message: "Item selected : " + quizSelected };
};
