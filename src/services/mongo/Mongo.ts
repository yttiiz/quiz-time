import { Db, MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import {
	GetDocumentsFromParameterType,
	GetDocumentFromParameterType,
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
			.findOne({ [key]: identifier });
	}

	public static async hashPassword(password: string, sizeSalt: number = 10) {
		const salt = await bcrypt.genSalt(sizeSalt);
		return await bcrypt.hash(password, salt);
	}

	public static async isPasswordOk(password: string, hash: string) {
		return await bcrypt.compare(password, hash);
	}
}
