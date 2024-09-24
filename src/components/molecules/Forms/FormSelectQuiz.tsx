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
import { DomHelper } from "@/utils/mod";

export const FormSelectQuiz = ({
	data,
}: {
	data: {
		title: string;
		options: SelectOptionsType[];
	};
}) => {
	const [{ message }, formAction] = useFormState(selectQuizServerAction, {
		message: "",
	});
	const { title, options } = data;
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		if (message) {
			if (message.includes("No item selected")) {
				return DomHelper.openDialog(dialogRef);
			}

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
				onClick={() => DomHelper.closeDialog(dialogRef)}
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
