"use server";
import { Fetcher } from "@/utils/mod";

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
		console.log(response.data);
		// Implements logic here.
	} else {
		console.log(response.message);
		// Implements logic here.
	}

	return { message: "Item selected : " + quizSelected };
};
