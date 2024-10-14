import { Login, MainLayout } from "@/components/mod";

export default function Page() {
	return (
		<MainLayout>
			<Login
				title="Créer votre compte"
				form="signup"
			/>
		</MainLayout>
	);
}
