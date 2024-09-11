"use client";

import {
	Button,
	IconElearning,
	Select,
	Dialog,
	SelectOptionsType,
} from "@/components/mod";
import { useFormState } from "react-dom";
import { selectQuizServerAction } from "@/actions/actions";
import { useEffect, useRef } from "react";

export const FormSelectQuiz = ({ data }: { data: Record<string, string> }) => {
	const [{ message }, formAction] = useFormState(selectQuizServerAction, {
		message: "",
	});
	const { title, options } = data as unknown as {
		title: string;
		options: SelectOptionsType[];
	};

	const dialogRef = useRef<HTMLDialogElement | null>(null);

	const openDialog = () => {
		if (dialogRef && dialogRef.current) {
			dialogRef.current.showModal();
		}
	};

	const handleOnClickDialog = () => {
		if (dialogRef.current) {
			dialogRef.current.close();
		}
	};

	useEffect(() => {
		if (message.includes("No item selected")) return openDialog();
		if (message) {
			globalThis.location.href = "/quiz/" + message;
		}
	}, [message]);

	return (
		<>
			<form action={formAction}>
				<h3 className="flex gap-4 items-center">
					<IconElearning variant="secondary" />
					{title}
				</h3>
				<Select
					name="select-quiz"
					options={options}
					placeholder="Choisissez votre thème..."
				/>
				<Button
					textContent="Envoyer"
					type="submit"
					spacing="2"
					radius="md"
					className="w-max"
				/>
			</form>
			<Dialog
				onClick={handleOnClickDialog}
				ref={dialogRef}
				header={{ title: "Quiz formulaire" }}
				main={{
					paragraph: "Vous devez sélectionner un thème pour pouvoir continuer.",
					buttons: ["fermer"],
				}}
			/>
		</>
	);
};
