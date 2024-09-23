"use client";

import { signUpServerAction } from "@/actions/actions";
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

export const FormSignup = () => {
	const [isEyeOpen, setIsEyeOpen] = useState(false);
	const [errorEmailMessage, setErrorEmailMessage] = useState("");
	const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

	const [{ message }, formAction] = useFormState(signUpServerAction, {
		message: "",
	});
	
	const [{ firstname, lastname, email, password }, dispatch] = useReducer(
		(
			state: {
				firstname: string;
				lastname: string;
				email: string;
				password: string;
			},
			action: {
				type: "firstname" | "lastname" | "email" | "password";
				payload: string;
			},
		) => {
			switch (action.type) {
				case "firstname": {
					return { ...state, firstname: action.payload };
				}

				case "lastname": {
					return { ...state, lastname: action.payload };
				}

				case "email": {
					return { ...state, email: action.payload };
				}

				case "password": {
					return { ...state, password: action.payload };
				}
			}
		},
		{
			firstname: "",
			lastname: "",
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
				label="Prénom"
				name="firstname"
				type="firstname"
				value={firstname}
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
					dispatch({ type: "firstname", payload: event.currentTarget.value });
					if (errorEmailMessage) setErrorEmailMessage("");
				}}
			/>
			<Input
				label="Nom"
				name="lastname"
				type="lastname"
				value={lastname}
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
					dispatch({ type: "lastname", payload: event.currentTarget.value });
					if (errorEmailMessage) setErrorEmailMessage("");
				}}
			/>
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
