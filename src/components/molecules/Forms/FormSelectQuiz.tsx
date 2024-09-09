"use client";

import { Select, SelectOptionsType, SelectPropsType } from "@/components/mod";
import { useFormState } from "react-dom";
import { selectQuizServerAction } from "@/actions/actions";

export const FormSelectQuiz = ({ data }: { data: Record<string, string> }) => {
	const [{ message }, formAction] = useFormState(selectQuizServerAction, {
		message: "",
	});

	const { title, options } = data as unknown as {
		title: string;
		options: SelectOptionsType[];
	};
  
	return (
		<form action={formAction}>
			<h3>{title}</h3>
			<Select
				name="select-quiz"
				options={options}
				placeholder="Choisissez votre thème..."
			/>
			<div>Message : {message}</div>
			<button type="submit">Envoyer</button>
		</form>
	);
};
