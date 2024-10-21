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

		const { acknowledged } = await Mongo.putDocumentKeyTo<UserSchemaType>({
			db: "main",
			collection: "users",
			key: "hash",
			identifier: newHash,
			id: user._id,
		});

		let message = "";

		// Check if user data has been modified.
		if (acknowledged) {
			const { isWriteLogOk, content } = (await NodeMailer.send({
				to: email,
				emailContent: await NodeMailer.createResetPasswordEmailContent(user.firstname, newPassword),
			})) as { isWriteLogOk: boolean; content: string };

			if (isWriteLogOk) {
				return NextResponse.json({ message: message ?? "Email send & write log successfully" }); 
			}

			const { ADMIN_EMAIL } = process.env;
			
			await NodeMailer.send({
				to: ADMIN_EMAIL as string,
				needToWriteLog: false,
				emailContent: {
					subject: "Email send to user",
					messageHtml: content,
					messagePlainText: content,
				}
			});
				
			return NextResponse.json({ message: message ?? "Email send" });

		} else (message = "Modification failed.");
	}

	return NextResponse.json({ message: "Incorrect value given." });
}
