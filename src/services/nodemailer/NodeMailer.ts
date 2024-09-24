import { createTransport } from "nodemailer";
import { MailConfigType, SendParameterType } from "./types";

export class NodeMailer {
	private static HOSTINGER_CONFIG: MailConfigType = {
		host: "smtp.hostinger.com",
		port: 465,
		secure: true,
	};

	public static async send({ to, receiver }: SendParameterType) {
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
			text: NodeMailer.plainText(receiver),
			html: NodeMailer.html(receiver),
		});

		// WIP
		console.log(info);
	}

	private static plainText(receiver: string) {
		return `${receiver}, \nLorem ispum dolor...`;
	}
	
	private static html(receiver: string) {
		return `<h1>${receiver}</h1>,\n<p>Lorem ispum dolor...</p>`;
	}
}
