import { MainLayout, Hero } from "@/components/mod";

export default function Home() {
	return (
		<MainLayout>
			<Hero
				title={"Quiz time"}
				subtitle={"Lorem ipsum dolor sit amet consectetur, adipisicing elit."}
				hookContent={
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, repellat ratione! Ut, itaque sit distinctio nulla aliquid id, natus enim hic autem harum incidunt numquam assumenda ex quibusdam commodi velit."
				}
			/>
		</MainLayout>
	);
}
