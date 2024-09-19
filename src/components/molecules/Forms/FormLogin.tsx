"use client";

import { Button } from "@/components/mod";
import { useFormState } from "react-dom";

export const FormLogin = () => {
	const [{ message }, formAction] = useFormState(
		(prevState: { message: string }, formData: FormData) => {
			return { message: "" };
		},
		{
			message: "",
		},
	);

	return (
		<form action={formAction}>
			<label>
				email :
				<input
					type="text"
					value={""}
				/>
			</label>
			<label>
				mot de passe :
				<input
					type="text"
					value={""}
				/>
			</label>
			<Button
				type="submit"
				textContent="Connexion"
				variant="secondary"
			/>
		</form>
	);
};
