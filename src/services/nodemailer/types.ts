export type SendParameterType = {
	to: string;
	emailContent: {
		subject: string;
		messagePlainText: string;
		messageHtml: string;
	};
	needToWriteLog?: boolean;
};

export type MailConfigType = {
  host: string;
  port: number;
  secure: boolean;
};