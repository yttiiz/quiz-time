"use client";

import { Dialog } from "@/components/mod";
import { InputPropsType } from "../mod";
import { useRef } from "react";
import { Crypto, DomHelper } from "@/utils/mod";
import { NodeMailer } from "@/services/mod";

export const Input = ({
	value,
	type,
	label,
	name,
	required = false,
	leadingIcon,
	trailingIcon,
	feedbackMessage,
	onClickPasswordButton,
	onInput,
	isLoginForm = false,
}: InputPropsType & {
	isLoginForm?: boolean;
}) => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	const sendEmailHandler = async () => {
		const newPassword = Crypto.generatePassword();
		await NodeMailer.send({
			to: "john.doe@test.us",
			receiver: "John",
			newPassword,
		});
	};

	return (
		<div className="grid gap-4">
			<label>
				{required ? `${label} *` : label}
				<div>
					{leadingIcon ? leadingIcon : null}
					<input
						type={type}
						value={value}
						name={name}
						onInput={onInput}
					/>
					{trailingIcon ? (
						name === "password" ? (
							<button
								type="button"
								onClick={onClickPasswordButton}
							>
								{trailingIcon}
							</button>
						) : (
							trailingIcon
						)
					) : null}
				</div>
				{type === "password" && isLoginForm ? (
					<button
						className="text-left font-bold"
						onClick={() => DomHelper.openDialog(dialogRef)}
						type="button"
					>
						Mot de passe oublié ?
					</button>
				) : null}
			</label>
			<span className="text-[#ff0000]">
				{feedbackMessage ? feedbackMessage : ""}
			</span>
			<Dialog
				onCrossButtonClick={() => DomHelper.closeDialog(dialogRef)}
				onMainButtonClick={sendEmailHandler}
				ref={dialogRef}
				header={{ title: "Mot de passe oublié ?" }}
				main={{
					paragraph:
						"Saisissez votre adresse e-mail et nous vous enverrons des instructions pour réinitialiser votre mot de passe.",
					buttons: ["Continuer"],
				}}
			/>
		</div>
	);
};
