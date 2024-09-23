import { Login, MainLayout } from "@/components/mod";
import style from "../login/login.module.css";

export default function Page() {
	return (
		<MainLayout>
			<Login
				id={style["form-log-container"]}
				title="Créer votre compte"
				form="signup"
			/>
		</MainLayout>
	);
}
