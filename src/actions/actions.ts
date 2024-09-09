export const selectQuizServerAction = (
	prevState: { message: string },
	formData: FormData,
) => {
	const choice = formData.get("select-quiz");

	if (!choice) return { message: "No item selected" };

	return { message: "Item selected : " + choice };
};
