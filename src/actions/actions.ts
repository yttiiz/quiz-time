export const selectQuizServerAction = async (
	prevState: { message: string },
	formData: FormData,
) => {
	const quizSelected = formData.get("select-quiz");
	const messageId = ((Math.random() + 1) * 1000).toFixed();
	const messageItemNotSelected = "No item selected - id: " + messageId;

	if (!quizSelected || prevState.message === messageItemNotSelected) {
		return { message: messageItemNotSelected };
	}

	return { message: `${quizSelected}` };
};

export const selectItemServerAction = (
	prevState: { message: string },
	formData: FormData,
) => {
	for (const questionAndUserResponse of formData) {
		// To stuff here.
	}

	return { message: "Formulaire valide" }
};