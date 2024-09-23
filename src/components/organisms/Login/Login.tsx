import {
	FormLogin,
	FormSignup,
	LoginPropsType,
	SignupLink,
} from "@/components/mod";

export const Login = ({ id, title, form = "signin" }: LoginPropsType) => {
	return (
		<section className="user-login">
			<div className="container grid md:py-24 md:px-6 gap-4">
				<div id={id}>
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
