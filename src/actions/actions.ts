import { Fetcher } from "@/utils/mod";

export const selectQuizServerAction = async (
	prevState: { message: string },
	formData: FormData,
) => {
	const quizSelected = formData.get("select-quiz");

	if (!quizSelected) return { message: "No item selected" };

	const response = await Fetcher.getData(
		globalThis.location.protocol + "/api/mongodb",
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
