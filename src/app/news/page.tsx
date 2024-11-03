import { MainLayout, NewsSection } from "@/components/mod";
import style from "./news.module.css";

export default function Home() {
	return (
		<MainLayout>
			<NewsSection id={style["news-article"]} />
		</MainLayout>
	);
}
