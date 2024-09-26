import { createTransport, SentMessageInfo } from "nodemailer";
import { MailConfigType, SendParameterType } from "./types";
import { Helper } from "@/utils/file-helper";
import { DateFormatter } from "@yttiiz/utils";

export class NodeMailer {
	private static HOSTINGER_CONFIG: MailConfigType = {
		host: "smtp.hostinger.com",
		port: 465,
		secure: true,
	};

	public static async send({
		to,
		receiver,
		newPassword,
	}: SendParameterType & { newPassword?: string }) {
		const {
			EMAIL_ADDRESS: email,
			EMAIL_USERNAME: username,
			EMAIL_PASSWORD: password,
		} = process.env;

		const transporter = createTransport({
			host: NodeMailer.HOSTINGER_CONFIG.host,
			port: NodeMailer.HOSTINGER_CONFIG.port,
			secure: NodeMailer.HOSTINGER_CONFIG.secure,
			auth: {
				user: email,
				pass: password,
			},
		});

		const info = await transporter.sendMail({
			from: `${username} - <${email}>`,
			to,
			subject: "Réinitialisiation de votre mot de passe",
			text: NodeMailer.plainText(receiver, newPassword),
			html: NodeMailer.html(receiver, newPassword),
		});

		const content = NodeMailer.generateLogContent(info, to);

		return await Helper.writeLog("src/logs/emails.txt", content);
	}

	private static generateLogContent(
		info: SentMessageInfo,
		email: string | undefined,
	) {
		const { messageId, response } = info;

		return `Email envoyé le : ${DateFormatter.display({ date: Date.now() })}.\nemail: ${email};\nid: ${messageId};\nresponse: ${response}\n\n`;
	}

	private static plainText(receiver: string, newPassword?: string) {
		return `${receiver}, \nLorem ispum dolor... ${newPassword ? `password : ${newPassword}` : ""}`;
	}

	private static html(receiver: string, newPassword?: string) {
		return `<h1>${receiver}</h1>,\n<p>Lorem ispum dolor...</p>${newPassword ? `password : ${newPassword}` : ""}`;
	}
}
