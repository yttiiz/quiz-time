/* eslint-disable react/display-name */
import { ForwardedRef, forwardRef, MouseEventHandler } from "react";
import { DialogHeader } from "./mod";
import { DialogBodyWithFieldText } from "./Body/BobyWithFieldText";
import { DialogPropsType } from "../types";

export const DialogWithFieldText = forwardRef(
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
				<DialogBodyWithFieldText
					paragraph={paragraph}
					buttons={buttons}
					onClick={onMainButtonClick}
				/>
			</dialog>
		);
	},
);
