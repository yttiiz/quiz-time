/* eslint-disable react/display-name */
import { ForwardedRef, forwardRef, MouseEventHandler } from "react";
import { DialogPropsType } from "../types";
import { DialogBody, DialogHeader } from "./mod";

export const Dialog = forwardRef(
	(
		{
			header: { title, details },
			main: { paragraph, buttons },
			onClick,
		}: DialogPropsType,
		ref: ForwardedRef<HTMLDialogElement | null>,
	) => {
		return (
			<dialog ref={ref}>
				<DialogHeader
					title={title}
					details={details}
					onClick={onClick}
				/>
				<DialogBody
					paragraph={paragraph}
					buttons={buttons}
					onClick={onClick}
				/>
			</dialog>
		);
	},
);
