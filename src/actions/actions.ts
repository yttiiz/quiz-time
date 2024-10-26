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

export const signUpServerAction = async (
	_: { message: string },
	formData: FormData,
) => {
	let messageWarning = "";
	const data: Record<string, string | string> = {};
	const entries = formData.entries();

	for (const [key, value] of entries) {
		if (!value) {
			messageWarning += `key ${key} is missing. `;
			continue;
		}

		data[key] = value as string;
	}

	if (messageWarning) return { message: messageWarning };

	const response = await Fetcher.postData<{ message: string }>(
		globalThis.location.origin + "/api/mongodb/user",
		data,
		"next",
	);

	if (response.ok) {
		let message = "";

		switch (response.data["message"]) {
			case "User not created": {
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

export const userModificationServerAction = async (
	_: { message: string },
	formData: FormData,
) => {
	const data: Record<string, string | string> = {};
	const entries = formData.entries();

	for (const [key, value] of entries) {
		data[key] = value as string;
	}

	const response = await Fetcher.putData<{ message: string }>(
		globalThis.location.origin + "/api/mongodb/user-details",
		data,
		"next",
	);

	if (response.ok) {
		return { message: response.data.message };
	}

	return { message: "User has not been modified" };
};

export const changePasswordServerAction = async (
	_: { message: string },
	formData: FormData,
) => {
	let messageWarning = "";
	const data: Record<string, string | string> = {};
	const entries = formData.entries();

	for (const [key, value] of entries) {
		if (!value) {
			messageWarning += `key ${key} is missing. `;
			continue;
		}

		data[key] = value as string;
	}

	if (messageWarning) return { message: messageWarning };

	if (data["create-password"] !== data["confirm-password"]) {
		return { message: "Password is not confirmed" }
	}

	const response = await Fetcher.putData<{ message: string }>(
		globalThis.location.origin + "/api/mongodb/user-password",
		data,
		"next",
	);

	if (response.ok) {
		return { message: response.data.message };
	}

	return { message: "User password has not been modified" };
};