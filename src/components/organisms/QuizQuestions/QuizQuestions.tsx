"use client";

import { Button, QuizItems } from "@/components/mod";
import { QuestionType } from "@/services/mod";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { selectItemServerAction } from "@/actions/actions";
import { useFormState } from "react-dom";

export const QuizQuestions = ({ list }: { list: QuestionType[] }) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [count, setCount] = useState(0);
	const [{ message }, formAction] = useFormState(selectItemServerAction, {
		message: "",
	});

	const onButtonClickHandler = (event: MouseEvent) => {
		if (formRef && formRef.current && count < list.length) {
			formRef.current.requestSubmit();
		}
	};

	useEffect(() => {
		if (message) {
			message.includes("invalid") ? null : setCount((count) => count + 1);
		}
	}, [message]);

	return (
		<>
			<div className="w-full relative overflow-hidden">
				{count < list.length ? (
					<>
						<h3>{list[count].question.title}</h3>
						<QuizItems
							ref={formRef}
							formAction={formAction}
							message={message}
							questions={list[count].question.propositions}
							name={list[count].question.title}
						/>
						<span className="absolute flex justify-center items-center bottom-0 right-0 w-[3.5rem] h-[3.5rem] border-2 rounded-full border-primary-content/20">
							{`${count + 1}/${list.length}`}
						</span>
					</>
				) : (
					<div>Fin de la partie. Calcul du résultat...</div>
				)}
			</div>
			<Button
				type="button"
				textContent="Question suivante"
				onClick={onButtonClickHandler}
			/>
		</>
	);
};
