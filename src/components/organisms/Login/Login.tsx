import {
	LoginPropsType,
	SignupLink,
} from "@/components/mod";
import { FormLogin, FormSignup } from "@/components/client.mod";

export const Login = ({ title, form = "signin" }: LoginPropsType) => {
	return (
		<section className="user-login">
			<div className="container grid md:py-24 md:px-6 gap-4">
				<div id="form-log-container">
					<h1 className="px-10 py-4">{title}</h1>
					{form === "signin" ? (
						<>
							<FormLogin />
							<SignupLink />
						</>
					) : (
						<FormSignup />
					)}
				</div>
			</div>
		</section>
	);
};
