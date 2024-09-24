import type { ErrorResponseType, SuccessResponseType } from "@yttiiz/utils";

export type QuizSectionPropsType<T> = {
	title: string;
	response: SuccessResponseType<T> | ErrorResponseType;
	id: string;
};

export type LoginPropsType = {
	id: string;
	title: string;
	form?: "signin" | "signup";
};