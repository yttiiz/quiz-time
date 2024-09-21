"use client";

import { loginServerAction } from "@/actions/actions";
import {
	Button,
	IconCrossEye,
	IconEye,
	IconUnlocked,
	IconUser,
	Input,
} from "@/components/mod";
import { useEffect, useReducer, useState } from "react";
import { useFormState } from "react-dom";

export const FormLogin = () => {
	const [{ message }, formAction] = useFormState(loginServerAction, {
		message: "",
	});

	const [isEyeOpen, setIsEyeOpen] = useState(false);
	const [errorEmailMessage, setErrorEmailMessage] = useState("");
	const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
	const [{ email, password }, dispatch] = useReducer(
		(
			state: { email: string; password: string },
			action: { type: "email" | "password"; payload: string },
		) => {
			switch (action.type) {
				case "email": {
					return { ...state, email: action.payload };
				}

				case "password": {
					return { ...state, password: action.payload };
				}
			}
		},
		{
			email: "",
			password: "",
		},
	);

	useEffect(() => {
		if (message.includes("connected")) {
			dispatch({ type: "email", payload: "" });
			dispatch({ type: "password", payload: "" });

			return;
		}

		if (message.includes("email")) {
			setErrorEmailMessage("Veuillez renseigner ce champ.");
		}

		if (message.includes("password")) {
			setErrorPasswordMessage("Veuillez renseigner ce champ.");
		}
	}, [message]);

	return (
		<form
			action={formAction}
			className="grid gap-4 p-10"
		>
			<Input
				label="Email"
				name="email"
				type="email"
				value={email}
				required={true}
				leadingIcon={
					<IconUser
						variant="primary"
						model="content"
						svgSize="xl"
					/>
				}
				feedbackMessage={errorEmailMessage}
				onInput={(event) => {
					dispatch({ type: "email", payload: event.currentTarget.value });
					if (errorEmailMessage) setErrorEmailMessage("");
				}}
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
				feedbackMessage={errorPasswordMessage}
				onClickPasswordButton={() => setIsEyeOpen(!isEyeOpen)}
				onInput={(event) => {
					dispatch({ type: "password", payload: event.currentTarget.value });
					if (errorPasswordMessage) setErrorPasswordMessage("");
				}}
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
