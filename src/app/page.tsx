import { MainLayout, Hero, QuizGames } from "@/components/mod";

export default function Home() {
	return (
		<MainLayout>
			<Hero />
			<QuizGames content="Target" />
		</MainLayout>
	);
}
