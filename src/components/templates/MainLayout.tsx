import { Fetcher } from "@yttiiz/utils";
import { Header, Footer, ItemType } from "../mod";
import { ReactNode } from "react";

export const MainLayout = async ({ children }: { children: ReactNode }) => {
	const { PAGE_TITLE, APP_URL: host } = process.env;
	const response = await Fetcher.postData<{ items: ItemType[] }>(
		`${host}/api/json`,
		{
			file: "header",
		},
		"next",
	);

	return (
		<>
			<Header
				title={PAGE_TITLE}
				host={host}
				response={response}
			/>
			<main>{children}</main>
			<Footer
				host={host}
				response={response}
			/>
		</>
	);
};
