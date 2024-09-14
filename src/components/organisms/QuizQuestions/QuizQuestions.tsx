"use client";

import { Button, QuizItems } from "@/components/mod";
import { QuestionType } from "@/services/mod";
import { MouseEvent, useRef, useState } from "react";

export const QuizQuestions = ({ list }: { list: QuestionType[] }) => {
	const questionsList = useRef<HTMLUListElement | null>(null);
	const [count, setCount] = useState(0);

	const onButtonClickHandler = (event: MouseEvent) => {
		if (questionsList && questionsList.current) {
			const forms = questionsList.current.querySelectorAll("form");

			forms[count].requestSubmit();
			setCount(count + 1);

			const slideWidth =
				questionsList.current.getBoundingClientRect().width / list.length;
			questionsList.current.style.transform = `translateX(-${slideWidth * (count + 1)}px)`;
		}
	};

	return (
		<>
			<div className="w-full overflow-hidden">
				<ul
					ref={questionsList}
					className="slider flex"
					style={{ width: `calc(100% * ${list.length})` }}
				>
					{list.map(({ question }, index) => (
						<li
							key={index + (Math.random() + 1) * 1000}
							style={{ width: `calc(100% / ${list.length})` }}
						>
							<h3>{question.title}</h3>
							<QuizItems
								questions={question.propositions}
								name={question.title}
							/>
						</li>
					))}
				</ul>
			</div>
			<Button
				type="button"
				textContent="Suivant"
				onClick={onButtonClickHandler}
			/>
		</>
	);
};
