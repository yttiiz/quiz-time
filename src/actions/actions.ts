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
	const setLocalStorage = (
		iteratorResult: IteratorResult<[string, FormDataEntryValue], any>,
		itemsAlreadySet?: string | null | undefined,
	) => {
		let item = "";

		if (itemsAlreadySet) {
			const prevItem = JSON.parse(itemsAlreadySet);
			item = JSON.stringify({
				...prevItem,
				[iteratorResult.value[0]]: iteratorResult.value[1],
			});
		} else {
			item = JSON.stringify({
				[iteratorResult.value[0]]: iteratorResult.value[1],
			});
		}

		globalThis.localStorage.setItem(
			"userResponses",
			item,
		);
	};

	itemsAlreadySet
		? setLocalStorage(iteratorResult, itemsAlreadySet)
		: setLocalStorage(iteratorResult);

	return { message: "valid - id: " + keyGen() };
};
