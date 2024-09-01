import { Button, Header, Item } from "@/components/mod";
import Image from "next/image";
import { DateFormatter, Age } from "@yttiiz/utils";

const items: Item[] = [];

for (let i = 0; i <= 3; i++) {
	items.push({ textContent: "item" + (i + 1), url: "/" });
}

export default function Home() {
	return (
		<>
			<Header
				title="Quiz"
				items={items}
			/>
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
