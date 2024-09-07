import { MainLayout, Hero } from "@/components/mod";

export default function Home() {
	return (
		<MainLayout>
			<Hero />
			<div id="quiz-games" className="h-screen">Target</div>
		</MainLayout>
	);
}
