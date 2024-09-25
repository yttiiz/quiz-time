"use client";

import { DialogWithFieldText } from "@/components/mod";
import { InputPropsType } from "../mod";
import { MouseEvent, useRef, useState } from "react";
import { DomHelper } from "@/utils/mod";
import { Fetcher } from "@yttiiz/utils";

export const InputWithForgotPassword = ({
	value,
	type,
	required = false,
	leadingIcon,
	trailingIcon,
	feedbackMessage,
	onClickPasswordButton,
	onInput,
}: Omit<InputPropsType, "label" | "name">) => {
	const originalMessage =
		"Saisissez votre adresse e-mail et nous vous enverrons des instructions pour réinitialiser votre mot de passe.";
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [dialogParagraph, setDialogParagraph] = useState<string | null>(
		originalMessage,
	);

	const sendEmailHandler = async (event: MouseEvent<HTMLButtonElement>) => {
		const email = event.currentTarget.dataset["bind"];

		if (email) {
			const response = await Fetcher.postData(
				globalThis.location.origin + "/api/forgot-password",
				{ email },
				"next",
			);

			if (response.ok && dialogRef.current) {
				setDialogParagraph(
					`Un message a été envoyé à l'adresse ${email}.`,
				);

				return;
			} else {
				setDialogParagraph(
					"Une erreur est survenue, par consequent, aucun message de réinitialisation ne vous a été envoyé.",
				);
			}
		}

		setDialogParagraph("Veuillez saisir votre email.");
	};

	return (
		<div className="grid gap-4">
			<label>
				Mot de passe{required ? " *" : ""}
				<div>
					{leadingIcon ? leadingIcon : null}
					<input
						type={type}
						value={value}
						name={"password"}
						onInput={onInput}
					/>
					{trailingIcon ? (
						<button
							type="button"
							onClick={onClickPasswordButton}
						>
							{trailingIcon}
						</button>
					) : null}
				</div>
				<button
					className="text-left font-bold"
					onClick={() => DomHelper.openDialog(dialogRef)}
					type="button"
				>
					Mot de passe oublié ?
				</button>
			</label>
			<span className="text-[#ff0000]">
				{feedbackMessage ? feedbackMessage : ""}
			</span>
			<DialogWithFieldText
				onCrossButtonClick={() => {
					DomHelper.closeDialog(dialogRef);
					setDialogParagraph(originalMessage);
				}}
				onMainButtonClick={sendEmailHandler}
				ref={dialogRef}
				header={{ title: "Mot de passe oublié ?" }}
				main={{
					paragraph: dialogParagraph ?? "",
					buttons: ["Continuer"],
				}}
			/>
		</div>
	);
};
