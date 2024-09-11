import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Mongo } from "@/services/mod";

export async function GET(req: NextRequest) {
	const documents = await Mongo.getDocumentsFrom({
		db: "quiz",
		collection: "series_001",
	});

	return documents
		? NextResponse.json(documents)
		: NextResponse.json({ message: "Mongodb not connected" });
}
