"use client";

import { changePasswordServerAction } from "@/actions/actions";
import {
	Button,
	Dialog,
	FormPasswordConfim,
	IconCrossEye,
	IconEye,
	IconUnlocked,
	Input,
} from "@/components/mod";
import { DomHelper } from "@/utils/mod";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useFormState } from "react-dom";

export const FormUserPassword = () => {
	const [isCreatePasswordEyeOpen, setIsCreatePasswordEyeOpen] = useState(false);
	const [errorCreatePasswordMessage, setErrorCreatePasswordMessage] = useState("");
	const [isConfirmPasswordEyeOpen, setIsConfirmPasswordEyeOpen] = useState(false);
	const [errorConfirmPasswordMessage, setErrorConfirmPasswordMessage] = useState("");
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	const [{ message }, formAction] = useFormState(changePasswordServerAction, {
		message: "",
	});

	const initializerArg = useMemo(
		() => ({
			password: "",
			confirmPassword: "",
		}),
		[],
	);

	const [{ password, confirmPassword }, dispatch] = useReducer(
		(
			state: FormPasswordConfim,
			action: {
				type: "password" | "confirmPassword";
				payload: string;
			},
		) => {
			switch (action.type) {
				case "password": {
					return { ...state, password: action.payload };
				}

				case "confirmPassword": {
					return { ...state, confirmPassword: action.payload };
				}
			}
		},
		initializerArg,
	);

	useEffect(() => {
		if (message.includes("updated") && dialogRef && dialogRef.current) {
			dispatch({ type: "password", payload: "" });
			dispatch({ type: "confirmPassword", payload: "" });
			DomHelper.openDialog(dialogRef);
		}

		if (message.includes("create-password")) {
			setErrorCreatePasswordMessage("Veuillez renseigner ce champ.");
		}

		if (message.includes("confirm-password")) {
			setErrorConfirmPasswordMessage("Veuillez renseigner ce champ.");
		}
		
		if (message.includes("not confirmed")) {
			setErrorConfirmPasswordMessage("Vous devez renseigner le même mot de passe.");
		}
	}, [message]);

	return (
		<>
			<form
				action={formAction}
				className="grid gap-4 p-10"
			>
				<Input
					label="Mot de passe"
					name="create-password"
					type={isCreatePasswordEyeOpen ? "text" : "password"}
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
						isCreatePasswordEyeOpen ? (
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
					feedbackMessage={errorCreatePasswordMessage}
					onClickPasswordButton={() => setIsCreatePasswordEyeOpen(!isCreatePasswordEyeOpen)}
					onInput={(event) => {
						dispatch({ type: "password", payload: event.currentTarget.value });
						if (errorCreatePasswordMessage) setErrorCreatePasswordMessage("");
					}}
				/>
				<Input
					label="Confirmez votre mot de passe"
					name="confirm-password"
					type={isConfirmPasswordEyeOpen ? "text" : "password"}
					value={confirmPassword}
					required={true}
					leadingIcon={
						<IconUnlocked
							variant="primary"
							model="content"
							svgSize="xl"
						/>
					}
					trailingIcon={
						isConfirmPasswordEyeOpen ? (
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
					feedbackMessage={errorConfirmPasswordMessage}
					onClickPasswordButton={() => setIsConfirmPasswordEyeOpen(!isConfirmPasswordEyeOpen)}
					onInput={(event) => {
						dispatch({ type: "confirmPassword", payload: event.currentTarget.value });
						if (errorConfirmPasswordMessage) setErrorConfirmPasswordMessage("");
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
				header={{ title: "Mise à jour" }}
				main={{ paragraph: "Votre mot de passe a bien été mis à jour." }}
				onCrossButtonClick={() => DomHelper.closeDialog(dialogRef)}
			/>
		</>
	);
};
