import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { RouteHelper } from "@/utils/route-helper";
import { Mongo, UserSchemaType } from "@/services/mod";

export async function GET(req: NextRequest) {
  const { email, password } = await RouteHelper.getUserData(req);

	if (email && password) {
		const user = await Mongo.getDocumentFrom<UserSchemaType>({
			db: "main",
			collection: "users",
			key: "email",
			identifier: email,
		});
	
		if (!user) return NextResponse.json({ message: "User not found" });
		
		return (user && await Mongo.isPasswordOk(password, user.hash))
			? NextResponse.json({ message: user.firstname })
			: NextResponse.json({ message: "Incorrect password" });
	}

	return NextResponse.json({ message: "Incorrect value given." });
}

export async function POST(req: NextRequest) {
  const { value, isValueAstring } = await RouteHelper.getValueAsString(req);

	if (isValueAstring) {
		const { email, password } = JSON.parse(value);
		const user = await Mongo.getDocumentFrom<UserSchemaType>({
			db: "main",
			collection: "users",
			key: "email",
			identifier: email,
		});

		if (!user) return NextResponse.json({ message: "User not found" });
		
		return (user && await Mongo.isPasswordOk(password, user.hash))
			? NextResponse.json({ message: user.firstname })
			: NextResponse.json({ message: "Incorrect password" });
	}

	return NextResponse.json({ message: "Incorrect value given." });
}
