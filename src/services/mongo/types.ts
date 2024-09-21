import { ObjectId } from "mongodb";

export type GetDocumentsFromParameterType = {
	db: string;
	collection: string;
};

export type GetDocumentFromParameterType<T> = GetDocumentsFromParameterType & {
	identifier: string;
	key: keyof T;
};

// Question Schema
export type QuestionDetailsType = {
	title: string;
	propositions: string[];
};

export type QuestionType = {
	_id: ObjectId;
	question: QuestionDetailsType;
	correction: string;
};

// User Schema
export type UserType = {
	firstname: string;
	lastname: string;
	email: string;
	role: string;
	job?: string;
	photo?: string;
	birth?: Date;
};

export type UserSchemaType = UserType & {
	hash: string;
};
