import { AboutSection, MainLayout } from "@/components/mod";
import style from "./about.module.css";

export default function Home() {
	return (
		<MainLayout>
      <AboutSection id={style["about"]} />
		</MainLayout>
	);
}
