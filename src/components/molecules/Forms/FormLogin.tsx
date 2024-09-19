"use client";

import { Button } from "@/components/mod";
import { SetterType, store, useUserDataForm } from "@/store/mod";
import { useFormState } from "react-dom";

export const FormLogin = () => {
	const [{ message }, formAction] = useFormState(
		(prevState: { message: string }, formData: FormData) => {
			return { message: "" };
		},
		{
			message: "",
		},
	);

  const [email, password, setEmail, setPassword] = store(
		useUserDataForm,
		"email",
		"password",
		"setEmail",
		"setPassword",
	) as [string, string, SetterType, SetterType];

	return (
		<form
			action={formAction}
			className="grid gap-4 p-10"
		>
			<label>
				Email :
				<input
					type="text"
					value={email}
          onInput={(event) => setEmail(event.currentTarget.value)}
				/>
			</label>
			<label>
				Mot de passe :
				<input
					type="password"
					value={password}
          onInput={(event) => setPassword(event.currentTarget.value)}
				/>
			</label>
			<Button
				type="submit"
				textContent="Connexion"
				variant="secondary"
        spacing="4"
			/>
		</form>
	);
};
