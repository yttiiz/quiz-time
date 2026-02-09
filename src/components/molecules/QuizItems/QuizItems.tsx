"use client";

import { Dialog } from "@/components/client.mod";
import { DomHelper } from "@/utils/mod";
import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import { QuizItemsPropsType } from "../mod";

// eslint-disable-next-line react/display-name
export const QuizItems = forwardRef(
	(
		{ questions, name, message, formAction }: QuizItemsPropsType,
		ref: ForwardedRef<HTMLFormElement | null>,
	) => {
		const dialogRef = useRef<HTMLDialogElement | null>(null);

		useEffect(() => {
			if (message.includes("invalid")) return DomHelper.openDialog(dialogRef);
		}, [message]);

		return (
			<>
				<form
					ref={ref}
					className="flex flex-col gap-4 my-6"
					action={formAction}
				>
					{questions.map((question, key) => (
						<label
							key={key + (Math.random() + 1) * 1000}
							className="flex gap-2 cursor-pointer"
						>
							<input
								type="radio"
								name={name}
								value={question}
							/>
							{question}
						</label>
					))}
				</form>
				<Dialog
					onCrossButtonClick={() => DomHelper.closeDialog(dialogRef)}
					onMainButtonClick={() => DomHelper.closeDialog(dialogRef)}
					ref={dialogRef}
					header={{ title: "Selection de la réponse" }}
					main={{
						paragraph:
							"Vous devez sélectionner une réponse pour pouvoir continuer.",
						buttons: ["fermer"],
					}}
				/>
			</>
		);
	},
);
