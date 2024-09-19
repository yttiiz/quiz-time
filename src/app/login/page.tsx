import { Login, MainLayout } from "@/components/mod";
import style from "./login.module.css";

export default function Page() {
  return (
		<MainLayout>
			<Login id={style["form-login-container"]} />
		</MainLayout>
	);
}