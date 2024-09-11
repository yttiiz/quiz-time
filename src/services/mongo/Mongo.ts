import { Db, MongoClient } from "mongodb";
import { GetDocumentsParameterType } from "./types";

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

	public static async getDocumentsFrom({
		db,
		collection,
	}: GetDocumentsParameterType) {
		return await (await Mongo.getDatabase(db))
			.collection(collection)
			.find()
			.toArray();
	}
}
