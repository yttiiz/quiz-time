import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { NodeMailer, Mongo } from "@/services/mod";
import { Crypto, RouteHelper } from "@/utils/mod";

export async function POST(req: NextRequest) {
	const { value, isValueAstring } = await RouteHelper.getValueAsString(req);

	if (isValueAstring) {
		const { firstname } = JSON.parse(value);

		const newPassword = Crypto.generatePassword();
		const newHash = await Mongo.hashPassword(newPassword);

		NodeMailer.send({
			to: "dominique.talis@proton.me",
			receiver: firstname,
			newPassword,
		});

		// Do stuff to update user 'hash' in DB.

		return NextResponse.json({ message: "Email send" });
	}

	return NextResponse.json({ message: "Incorrect value given." });
}
