import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Mongo } from "@/services/mod";
import { RouteHelper } from "@/utils/mod";

export async function POST(req: NextRequest) {
  const { value, isValueAstring } = await RouteHelper.getValueAsString(req);

	if (isValueAstring) {
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
