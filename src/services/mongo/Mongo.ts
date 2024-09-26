import {
	Db,
	Filter,
	MatchKeysAndValues,
	MongoClient,
	OptionalUnlessRequiredId,
} from "mongodb";
import {
	GetDocumentsFromParameterType,
	GetDocumentFromParameterType,
	PostDocumentToParameterType,
	PutDocumentToParameterType,
} from "./types";
import { Document } from "mongodb";

export class Mongo {
	private static client = Mongo.initClient();
	private static database: Db | undefined;

	private static initClient() {
		const {
			MONGODB_USERNAME: username,
			MONGODB_PASSWORD: password,
			MONGODB_HOST: host,
		} = process.env;
		const url = `mongodb+srv://${username}:${password}@${host}/?authMechanism=SCRAM-SHA-1`;

		return new MongoClient(url);
	}

	private static async getDatabase(db: string) {
		if (!Mongo.database) {
			Mongo.database = Mongo.client.db(db);
		}

		return Mongo.database;
	}

	public static async getDocumentsFrom<T extends Document = Document>({
		db,
		collection,
	}: GetDocumentsFromParameterType) {
		return await (await Mongo.getDatabase(db))
			.collection<T>(collection)
			.find()
			.toArray();
	}

	public static async getDocumentFrom<T extends Document = Document>({
		db,
		collection,
		identifier,
		key,
	}: GetDocumentFromParameterType<T>) {
		return await (await Mongo.getDatabase(db))
			.collection<T>(collection)
			.findOne({ [key]: identifier } as Filter<T>);
	}

	public static async postDocumentTo<T extends Document = Document>({
		db,
		collection,
		data,
	}: PostDocumentToParameterType<T>) {
		return await (await Mongo.getDatabase(db))
			.collection<T>(collection)
			.insertOne({
				...data,
			} as unknown as OptionalUnlessRequiredId<T>);
	}

	public static async putDocumentTo<T extends Document = Document>({
		db,
		collection,
		identifier,
		key,
		id,
	}: PutDocumentToParameterType<T>) {
		return await (await Mongo.getDatabase(db))
			.collection<T>(collection)
			.updateOne({ _id: id } as Filter<T>, {
				$set: { [key]: identifier } as unknown as MatchKeysAndValues<T>,
			});
	}
}
