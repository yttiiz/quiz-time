import { ObjectId } from "mongodb";

export type GetDocumentsParameterType = {
	db: string;
	collection: string;
};

export type QuestionDetailsType = {
	title: string;
	propositions: string[];
};

export type QuestionType = {
	_id: ObjectId;
	question: QuestionDetailsType;
	correction: string;
};
