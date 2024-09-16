"use client";

import { forwardRef, ForwardedRef, useRef, useEffect } from "react";
import { Dialog, QuizItemsPropsType } from "../mod";

// eslint-disable-next-line react/display-name
export const QuizItems = forwardRef(
	(
		{ questions, name, message, formAction }: QuizItemsPropsType,
		ref: ForwardedRef<HTMLFormElement | null>,
	) => {
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
			if (message.includes("invalid")) return openDialog();
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
					onClick={handleOnClickDialog}
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
