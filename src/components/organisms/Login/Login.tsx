import { FormLogin } from "@/components/mod";

export const Login = ({ id }: { id: string }) => {
	return (
		<section className="user-login">
			<div className="container grid py-24 px-6 gap-4">
				<div id={id}>
					<h1 className="px-10">Connectez-vous</h1>
					<FormLogin />
				</div>
			</div>
		</section>
	);
};
