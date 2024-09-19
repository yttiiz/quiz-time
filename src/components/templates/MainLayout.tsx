import { Fetcher } from "@yttiiz/utils";
import { Header, Footer } from "../mod";
import { ReactNode } from "react";

export const MainLayout = async ({ children }: { children: ReactNode }) => {
	const { PAGE_TITLE, __NEXT_PRIVATE_ORIGIN: host } = process.env;
	const response = await Fetcher.postData(
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
