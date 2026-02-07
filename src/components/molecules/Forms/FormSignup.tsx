"use client";

import { handleSignUp } from "@/actions/authActions";
import {
	Button,
	Dialog,
	FormSignupState,
	IconCrossEye,
	IconEye,
	IconUnlocked,
	IconUser,
	Input,
} from "@/components/mod";
import { DomHelper } from "@/utils/mod";
import {
	SubmitEvent,
	useMemo,
	useReducer,
	useRef,
	useState,
} from "react";

export const FormSignup = () => {
	const [isEyeOpen, setIsEyeOpen] = useState(false);
	const [errorFirstnameMessage, setErrorFirstnameMessage] = useState("");
	const [errorLastnameMessage, setErrorLastnameMessage] = useState("");
	const [errorEmailMessage, setErrorEmailMessage] = useState("");
	const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	const initializerArg = useMemo(
		() => ({
			firstname: "",
			lastname: "",
			email: "",
			password: "",
		}),
		[],
	);

	const [{ firstname, lastname, email, password }, dispatch] = useReducer(
		(
			state: FormSignupState,
			action: {
				type: keyof FormSignupState;
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
		initializerArg,
	);

	const formServerAction = async (formData: FormData) => {
		const result = await handleSignUp(formData);

		if (result) {
			return DomHelper.openDialog(dialogRef);
		}
	};

	const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		const formData = new FormData(event.currentTarget);

		for (const [key, value] of formData) {
			if (!value) {
				switch (key) {
					case "firstname": {
						setErrorFirstnameMessage("Veuillez renseigner ce champ");
						break;
					}

					case "lastname": {
						setErrorLastnameMessage("Veuillez renseigner ce champ");
						break;
					}

					case "email": {
						setErrorEmailMessage("Veuillez renseigner ce champ");
						break;
					}

					case "password": {
						setErrorPasswordMessage("Veuillez renseigner ce champ");
						break;
					}
				}

				event.preventDefault();
			}
		}
	};

	return (
		<>
			<form
				action={formServerAction}
				onSubmit={onSubmit}
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
					feedbackMessage={errorFirstnameMessage}
					onInput={(event) => {
						dispatch({ type: "firstname", payload: event.currentTarget.value });
						if (errorFirstnameMessage) setErrorFirstnameMessage("");
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
					feedbackMessage={errorLastnameMessage}
					onInput={(event) => {
						dispatch({ type: "lastname", payload: event.currentTarget.value });
						if (errorLastnameMessage) setErrorLastnameMessage("");
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
					textContent="Envoyer"
					variant="secondary"
					spacing="4"
				/>
			</form>
			<Dialog
				ref={dialogRef}
				header={{ title: "Inscription" }}
				main={{ paragraph: "Quelque chose s'est mal passé durant votre inscription. Veuillez réessayer ultérieurement." }}
				onCrossButtonClick={() => DomHelper.closeDialog(dialogRef)}
			/>
		</>
	);
};
