import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { RouteHelper } from "@/utils/route-helper";
import { Mongo, UserSchemaType } from "@/services/mod";
import { Crypto } from "@/utils/crypto";

export async function PUT(req: NextRequest) {
	const { value, isValueAstring } = await RouteHelper.getValueAsString(req);
  //TODO  WIP - To be removed.
  const email = process.env.EMAIL_TEST as string;

	if (isValueAstring) {
		const { "create-password": password } = JSON.parse(value);
		const user = await Mongo.getDocumentFrom<UserSchemaType>({
			db: "main",
			collection: "users",
			key: "email",
			identifier: email,
		});

		if (!user) return NextResponse.json({ message: "User not found" });

    const hash = await Crypto.hashPassword(password);
		const { acknowledged } = await Mongo.putDocumentKeyTo<UserSchemaType>({
			db: "main",
			collection: "users",
			id: user._id,
      identifier: hash,
      key: "hash"
		});

		return acknowledged
			? NextResponse.json({ message: "Password has been updated." })
			: NextResponse.json({ message: "Password has not been updated." });
	}

	return NextResponse.json({ message: "Incorrect value given." });
}
