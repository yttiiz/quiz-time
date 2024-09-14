"use client";

import { selectItemServerAction } from "@/actions/actions";
import { useFormState } from "react-dom";
import { forwardRef, ForwardedRef } from "react";

// eslint-disable-next-line react/display-name
export const QuizItems = forwardRef(
	(
		{
			questions,
			name,
		}: {
			questions: string[];
			name: string;
		},
		ref: ForwardedRef<HTMLFormElement | null>,
	) => {
		const [{ message }, formAction] = useFormState(selectItemServerAction, {
			message: "",
		});

		return (
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
		);
	},
);
