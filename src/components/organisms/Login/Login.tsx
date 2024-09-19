import { FormLogin } from "@/components/mod";

export const Login = () => {
	return (
		<section
			className="user-login"
		>
			<div className="container grid py-24 px-6 gap-4">
				<h1>Connectez-vous</h1>
				<FormLogin />
			</div>
		</section>
	);
};
