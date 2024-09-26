import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { RouteHelper } from "@/utils/route-helper";
import { Mongo, UserSchemaType } from "@/services/mod";
import { ObjectId } from "mongodb";
import { Crypto } from "@/utils/crypto";

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
		
		return (user && await Crypto.isPasswordOk(password, user.hash))
			? NextResponse.json({ message: user.firstname })
			: NextResponse.json({ message: "Incorrect password" });
	}

	return NextResponse.json({ message: "Incorrect value given." });
}

export async function POST(req: NextRequest) {
  const { value, isValueAstring } = await RouteHelper.getValueAsString(req);

	if (isValueAstring) {
		const { firstname, lastname, email, password } = JSON.parse(value);
		const hash = await Crypto.hashPassword(password);

		const { acknowledged } = await Mongo.postDocumentTo<UserSchemaType>({
			db: "main",
			collection: "users",
			data: { _id: new ObjectId(), firstname, lastname, email, hash, role: "user" }
		});

		if (!acknowledged) return NextResponse.json({ message: "User not created" });
		
		return NextResponse.json({ message: firstname })
	}

	return NextResponse.json({ message: "Incorrect value given." });
}
