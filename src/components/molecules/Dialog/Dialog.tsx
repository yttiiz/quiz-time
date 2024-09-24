/* eslint-disable react/display-name */
import { ForwardedRef, forwardRef, MouseEventHandler } from "react";
import { DialogPropsType } from "../types";
import { DialogBody, DialogHeader } from "./mod";

export const Dialog = forwardRef(
	(
		{
			header: { title, details },
			main: { paragraph, buttons },
			onCrossButtonClick,
			onMainButtonClick,
		}: DialogPropsType,
		ref: ForwardedRef<HTMLDialogElement | null>,
	) => {
		return (
			<dialog ref={ref}>
				<DialogHeader
					title={title}
					details={details}
					onClick={onCrossButtonClick}
				/>
				<DialogBody
					paragraph={paragraph}
					buttons={buttons}
					onClick={onMainButtonClick}
				/>
			</dialog>
		);
	},
);
