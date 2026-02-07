"use client";

import { Button, QuizItems, QuizResult } from "@/components/mod";
import { QuestionSchemaType } from "@/services/mod";
import { useEffect, useRef, useState } from "react";
import { selectItemServerAction } from "@/actions/actions";
import { useActionState } from "react";

export const QuizQuestions = ({ list }: { list: QuestionSchemaType[] }) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [count, setCount] = useState(0);
	const [points, setPoints] = useState(0);

	const isQuizEnded = count < list.length;
	const [{ message }, formAction] = useActionState(selectItemServerAction, {
		message: "",
	});

	const onClickNextQuestionButtonHandler = () => {
		if (formRef && formRef.current && count < list.length) {
			formRef.current.requestSubmit();
		}
	};

	const getUserResponses = (key = "userResponses") => {
		const items = globalThis.localStorage.getItem(key);

		if (items) {
			const responses = JSON.parse(items);
			globalThis.localStorage.removeItem(key);

			return responses;
		}
	};

	const getResult = (
		userResponses: Record<string, string> | undefined,
		responses: QuestionSchemaType[],
	) => {
		let points = 0;

		if (userResponses) {
			for (const response of responses) {
				if (response.correction === userResponses[response.question.title]) {
					points++;
				}
			}
		}

		return points;
	};

	useEffect(() => {
		if (message) {
			message.includes("invalid") ? null : setCount((count) => count + 1);
		}

		if (!isQuizEnded) {
			const userResponses = getUserResponses();
			setPoints((value) => value + getResult(userResponses, list));
		}
	}, [message, isQuizEnded, points, list]);

	return (
		<>
			<div className="w-full pb-12 md:pb-0 mb-4 md:mb-0 relative overflow-hidden">
				{isQuizEnded ? (
					<>
						<h3>{list[count].question.title}</h3>
						<QuizItems
							ref={formRef}
							formAction={formAction}
							message={message}
							questions={list[count].question.propositions}
							name={list[count].question.title}
						/>
						<span className="absolute flex justify-center items-center bottom-0 md:right-0 w-[3.5rem] h-[3.5rem] border-2 rounded-full border-primary-content/20">
							{`${count + 1}/${list.length}`}
						</span>
					</>
				) : (
					<QuizResult
						points={points}
						max={list.length}
					/>
				)}
			</div>
			<div className="flex gap-4">
				{isQuizEnded ? (
					<>
						<Button
							type="button"
							textContent={
								count < list.length - 1
									? "Question suivante"
									: "Terminer le quiz"
							}
							onClick={onClickNextQuestionButtonHandler}
						/>
						<Button
							type="button"
							variant="alert"
							textContent="Passer"
							onClick={() => setCount((count) => count + 1)}
						/>
					</>
				) : null}
			</div>
		</>
	);
};
