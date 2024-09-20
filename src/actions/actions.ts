import { DomHelper } from "@/utils/mod";

const keyGen = () => ((Math.random() + 1) * 1000).toFixed();

export const selectQuizServerAction = async (
	prevState: { message: string },
	formData: FormData,
) => {
	const quizSelected = formData.get("select-quiz");
	const messageItemNotSelected = "No item selected - id: " + keyGen();

	if (!quizSelected || prevState.message === messageItemNotSelected) {
		return { message: messageItemNotSelected };
	}

	return { message: `${quizSelected}` };
};

export const selectItemServerAction = async (
	_: { message: string },
	formData: FormData,
) => {
	const iteratorResult = formData.entries().next();

	if (iteratorResult.done) {
		return { message: "invalid - id: " + keyGen() };
	}

	const itemsAlreadySet = globalThis.localStorage.getItem("userResponses");

	itemsAlreadySet
		? DomHelper.setLocalStorage(iteratorResult, itemsAlreadySet)
		: DomHelper.setLocalStorage(iteratorResult);

	return { message: "valid - id: " + keyGen() };
};


export const loginServerAction = async (
	prevState: { message: string },
	formData: FormData,
) => {
	for (const item of formData.values()) {
		console.log(item);
		// WIP
	}

	return { message: "user connected" };
};
