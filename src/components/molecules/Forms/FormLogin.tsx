"use client";

import {
	Button,
	IconCrossEye,
	IconEye,
	IconUnlocked,
	IconUser,
	Input,
} from "@/components/mod";
import { SetterType, store, useUserDataForm } from "@/store/mod";
import { useState } from "react";
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

	const [isEyeOpen, setIsEyeOpen] = useState(false);
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
				required={true}
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
				type={isEyeOpen ? "text" : "password"}
				value={password}
				required={true}
				leadingIcon={
					<IconUnlocked
						variant="primary"
						model="content"
						svgSize="xl"
					/>
				}
				trailingIcon={
					isEyeOpen ? (
						<IconEye
							variant="primary"
							model="content"
							svgSize="lg"
						/>
					) : (
						<IconCrossEye
							variant="primary"
							model="content"
							svgSize="lg"
						/>
					)
				}
				onClickPasswordButton={() => setIsEyeOpen(!isEyeOpen)}
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
