import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { NodeMailer, Mongo, UserSchemaType } from "@/services/mod";
import { RouteHelper } from "@/utils/mod";
import { Crypto } from "@/utils/crypto";
export async function POST(req: NextRequest) {
	const { value, isValueAstring } = await RouteHelper.getValueAsString(req);

	if (isValueAstring) {
		const { email } = JSON.parse(value);
		const user = await Mongo.getDocumentFrom<UserSchemaType>({
			db: "main",
			collection: "users",
			key: "email",
			identifier: email,
		});

		if (!user) return NextResponse.json({ message: "User not found" });

		// Generate random password.
		const newPassword = Crypto.generatePassword();
		const newHash = await Crypto.hashPassword(newPassword);

		const { acknowledged } = await Mongo.putDocumentTo<UserSchemaType>({
			db: "main",
			collection: "users",
			key: "hash",
			identifier: newHash,
			id: user._id,
		});

		let message = "";

		acknowledged
			? NodeMailer.send({
					to: email,
					receiver: user.firstname,
					newPassword,
				})
			: (message = "Modification failed.");

		return NextResponse.json({ message: message ?? "Email send" });
	}

	return NextResponse.json({ message: "Incorrect value given." });
}
