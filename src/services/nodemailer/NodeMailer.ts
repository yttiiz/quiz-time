import { createTransport, SentMessageInfo } from "nodemailer";
import { MailConfigType, SendParameterType } from "./types";
import { FileHelper } from "@/utils/file-helper";
import { DateFormatter, Fetcher } from "@yttiiz/utils";

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

		const { subject, messagePlainText, messageHtml } =
			await NodeMailer.createEmailContent(receiver, newPassword);

		const info = await transporter.sendMail({
			from: `${username} - <${email}>`,
			to,
			subject,
			text: NodeMailer.plainText(messagePlainText),
			html: NodeMailer.html(messageHtml),
		});

		const content = NodeMailer.generateLogContent(info, to);

		return await FileHelper.writeLog("src/logs/emails.txt", content);
	}

	private static generateLogContent(
		info: SentMessageInfo,
		email: string | undefined,
	) {
		const { messageId, response } = info;

		return `Email envoyé le : ${DateFormatter.display({ date: Date.now() })}.\nemail: ${email};\nid: ${messageId};\nresponse: ${response}\n\n`;
	}

	private static async createEmailContent(
		receiver: string,
		newPassword: string | undefined,
	) {
		const { __NEXT_PRIVATE_ORIGIN: host } = process.env;
		const response = await Fetcher.postData<{
			title: string;
			contentText: string;
			contentHtml: string;
			greetings: string;
			team: string;
		}>(
			host + "/api/json",
			{
				file: "reset-password-email-content",
			},
			"next",
		);

		let subject = "";
		let messagePlainText = "";
		let messageHtml = "";

		if (response.ok) {
			const { title, contentText, contentHtml, greetings, team } =
				response.data;
			subject = title;

			// Plain text.
			messagePlainText = contentText.replace("{{ userFirstname }}", receiver);
			messagePlainText = messagePlainText.replace(
				"{{ newPassword }}",
				newPassword as string,
			);
			messagePlainText += `${greetings}`;
			messagePlainText += `${team}`;

			// Html text.
			messageHtml = contentHtml.replace("{{ userFirstname }}", `${receiver}`);
			messageHtml = messageHtml.replace("{{ newPassword }}", `${newPassword}`);
			messageHtml += `${greetings}`;
			messageHtml += `${team}`;
		}

		return {
			subject,
			messageHtml,
			messagePlainText,
		};
	}

	private static plainText(message: string) {
		return message;
	}

	private static html(message: string) {
		return message;
	}
}
