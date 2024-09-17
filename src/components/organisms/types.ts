import type { ErrorResponseType, SuccessResponseType } from "@yttiiz/utils";

export type QuizSectionPropsType = {
	title: string;
	response: SuccessResponseType | ErrorResponseType;
	id: string;
}