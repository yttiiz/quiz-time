import { DomHelper } from "@/utils/mod";
import { Fetcher } from "@yttiiz/utils";

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

export const signInServerAction = async (
	_: { message: string },
	formData: FormData,
) => {
	let messageWarning = "";
	let email = "";
	let password = "";
	const entries = formData.entries();

	for (const [key, value] of entries) {
		if (!value) {
			messageWarning += `key ${key} is missing. `;
		}

		key === "email"
			? (email = value.toString())
			: (password = value.toString());
	}

	if (messageWarning) return { message: messageWarning };

	const response = await Fetcher.postData(
		globalThis.location.origin + "/api/mongodb/user",
		{
			email,
			password,
		},
		"next",
	);

	if (response.ok) {
		let message = "";

		switch (response.data["message"]) {
			case "Incorrect password":
			case "User not found": {
				message = response.data["message"];
				break;
			}

			default: {
				message = "User connected | firstname: " + response.data["message"];
				break;
			}
		}

		return { message };
	}

	return { message: response.message };
};

export const signUpServerAction = (
	prevState: { message: string },
	formData: FormData,
) => {
	let messageWarning = "";
	const entries = formData.entries();

	for (const [key, value] of entries) {
		if (!value) {
			messageWarning += `key ${key} is missing. `;
		}
	}

	if (messageWarning) return { message: messageWarning };

	return { message: "" };
};

export const signOutServerAction = () => {
	globalThis.localStorage.removeItem("userFirstname");

	return { message: "User disconnected" };
};
