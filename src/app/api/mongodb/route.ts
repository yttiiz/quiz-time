import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Mongo } from "@/services/mod";

export async function POST(req: NextRequest) {
	const value = (await req.formData()).get("value");
	const isValueAString = !!value && !(value instanceof File);

	if (isValueAString) {
		const { quiz } = JSON.parse(value);
		const documents = await Mongo.getDocumentsFrom({
			db: "quiz",
			collection: quiz,
		});

		return documents.length > 0
			? NextResponse.json(documents)
			: NextResponse.json({ message: "Collection not found." });
	}

	return NextResponse.json({ message: "Incorrect value given." });
}
