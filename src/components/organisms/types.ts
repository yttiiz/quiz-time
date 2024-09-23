import type { ErrorResponseType, SuccessResponseType } from "@yttiiz/utils";

export type QuizSectionPropsType = {
	title: string;
	response: SuccessResponseType | ErrorResponseType;
	id: string;
};

export type LoginPropsType = {
	id: string;
	title: string;
	form?: "signin" | "signup";
};