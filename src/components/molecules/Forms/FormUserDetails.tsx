"use client";

import { signInServerAction } from "@/actions/actions";
import {
	Button,
	FormLoginState,
	IconCrossEye,
	IconEye,
	IconUnlocked,
	IconUser,
	Input,
	InputWithForgotPassword,
} from "@/components/mod";
import { UserType } from "@/services/mod";
import { useEffect, useReducer, useState } from "react";
import { useFormState } from "react-dom";

export const FormUserDetails = ({ user }: { user: UserType }) => {
	const [isEyeOpen, setIsEyeOpen] = useState(false);
	const [errorEmailMessage, setErrorEmailMessage] = useState("");
	const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

	const [{ message }, formAction] = useFormState(signInServerAction, {
		message: "",
	});
	
	const [{ email, password }, dispatch] = useReducer(
		(
			state: FormLoginState,
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
		if (message.includes("User")) {
			if (message.includes("connected")) {
				dispatch({ type: "email", payload: "" });
				dispatch({ type: "password", payload: "" });

				const userFirstname = message.split(": ")[1].trim();
				
				// Set firstname.
				globalThis.localStorage.setItem("userFirstname", userFirstname);

				// Redirect to home page.
				globalThis.location.href = "/";

			} else {
				setErrorEmailMessage("Email inconnu");
			}

			return;
		}

		if (message.includes("email")) {
			setErrorEmailMessage("Veuillez renseigner ce champ.");
		}

		if (message.includes("password")) {
			message.includes("is missing")
				? setErrorPasswordMessage("Veuillez renseigner ce champ.")
				: setErrorPasswordMessage("Votre mot de passe est incorrect");
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
			<InputWithForgotPassword
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
