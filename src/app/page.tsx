import { MainLayout, Hero } from "@/components/mod";

export default function Home() {
	return (
		<MainLayout>
			<div className="container flex min-h-screen flex-col">
				<Hero title={"Quiz time"} />
			</div>
		</MainLayout>
	);
}
