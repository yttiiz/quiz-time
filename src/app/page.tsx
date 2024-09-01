import { Button, Header } from "@/components/mod";
import Image from "next/image";
import { DateFormatter, Age } from "@yttiiz/utils";

export default function Home() {
	return (
		<>
			<Header />
			<main className="flex min-h-screen flex-col items-center justify-between p-24">
				<Button
					textContent={"Click me"}
					className={"font-bold"}
				/>
				<div>{DateFormatter.display({ date: Date.now() })}</div>
				<div>{Age.getWithYear("1980-07-24")}</div>
			</main>
		</>
	);
}
