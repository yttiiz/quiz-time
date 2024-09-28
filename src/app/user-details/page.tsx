import { MainLayout } from "@/components/mod";
import { UserDetailsSection } from "@/components/mod";
import style from "./user-details.module.css";

export default async function Page() {
	return (
		<MainLayout>
			<UserDetailsSection id={style["user-details"]} />
		</MainLayout>
	);
}
