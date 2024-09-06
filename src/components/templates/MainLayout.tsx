import { Age, DateFormatter } from "@yttiiz/utils";
import { Button, Header } from "../mod";
import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
			<Header />
			<main className="flex min-h-screen flex-col items-center justify-between p-24">
				<Button
					textContent={"Click me"}
					className={"font-bold"}
				/>
        {children}
				<div>{DateFormatter.display({ date: Date.now() })}</div>
				<div>{Age.getWithYear("1980-07-24")}</div>
			</main>
		</>
  );
};