"use client";

import { MouseEventHandler, useState } from "react";
import { DialogMainPropsType } from "../../types";
import { Button, Input } from "@/components/mod";
import { useDialogFieldDisplayStore } from "@/store/store";

export const DialogBodyWithFieldText = ({
	paragraph,
	buttons,
	onClick,
}: DialogMainPropsType & {
	onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
	const [inputValue, setInputValue] = useState("");
	const isFieldDisplay = useDialogFieldDisplayStore(
		(state) => state.isFieldDisplay,
	);

	return (
		<div>
			<p>{paragraph}</p>
			{isFieldDisplay ? (
				<>
					<Input
						label="Votre email"
						value={inputValue}
						onInput={(event) => setInputValue(event.currentTarget.value)}
					/>
					{buttons?.map((textContent, key) => (
						<Button
							key={key + (Math.random() + 1) * 10}
							dataBind={inputValue}
							textContent={textContent}
							type="button"
							onClick={(event) => {
								if (onClick) {
									onClick(event);
									setInputValue("");
								}
							}}
						/>
					))}
				</>
			) : null}
		</div>
	);
};
