import { Button } from "@/components/atoms/Button/mod";
import Image from "next/image";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Button
				textContent={"Click me"}
				className={"font-bold"}
			/>
		</main>
	);
}
