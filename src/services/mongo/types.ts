import { ObjectId } from "mongodb";

export type GetDocumentsFromParameterType = {
	db: string;
	collection: string;
};

export type GetDocumentFromParameterType<T> = GetDocumentsFromParameterType & {
	identifier: string;
	key: keyof T;
};

export type PostDocumentToParameterType<T> = GetDocumentsFromParameterType & {
	data: T;
};

export type PutDocumentKeyToParameterType<T> =
	GetDocumentFromParameterType<T> & {
		id: ObjectId;
	};
	
export type PutDocumentToParameterType<T> = GetDocumentsFromParameterType & {
	id: ObjectId;
	data: T
}

// Question Schema
export type QuestionDetailsType = {
	title: string;
	propositions: string[];
};

export type QuestionSchemaType = {
	_id: ObjectId;
	question: QuestionDetailsType;
	correction: string;
};

// User Schema
export type UserType = {
	_id: ObjectId;
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
