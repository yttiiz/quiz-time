import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { RouteHelper } from "@/utils/route-helper";
import { Mongo, UserSchemaType } from "@/services/mod";

export async function GET(req: NextRequest) {
	const { email } = await RouteHelper.getUserData(req);

	if (email) {
		const user = await Mongo.getDocumentFrom<UserSchemaType>({
			db: "main",
			collection: "users",
			key: "email",
			identifier: email,
		});

		return user
			? NextResponse.json(user)
			: NextResponse.json({});
	}

	return NextResponse.json({ message: "Incorrect value given." });
}
