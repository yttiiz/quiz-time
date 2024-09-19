"use client";

import { Button, IconUnlocked, IconUser, Input } from "@/components/mod";
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
			<Input
				label="Email"
				name="email"
				type="text"
				value={email}
				leadingIcon={
					<IconUser
						variant="primary"
						model="content"
						svgSize="xl"
					/>
				}
				onInput={(event) => setEmail(event.currentTarget.value)}
			/>
			<Input
				label="Mot de passe"
				name="password"
				type="password"
				value={password}
        leadingIcon={
					<IconUnlocked
						variant="primary"
						model="content"
						svgSize="xl"
					/>
				}
				onInput={(event) => setPassword(event.currentTarget.value)}
			/>
			<Button
				type="submit"
				textContent="Connexion"
				variant="secondary"
				spacing="4"
			/>
		</form>
	);
};
