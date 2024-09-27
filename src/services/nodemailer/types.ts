export type SendParameterType = {
	to: string;
	emailContent: {
		subject: string;
		messagePlainText: string;
		messageHtml: string;
	};
};

export type MailConfigType = {
  host: string;
  port: number;
  secure: boolean;
};