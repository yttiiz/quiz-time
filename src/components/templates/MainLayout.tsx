import { Header } from "../mod";
import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
};
