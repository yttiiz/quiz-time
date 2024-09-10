/* eslint-disable react/display-name */
import { ForwardedRef, forwardRef, MouseEventHandler } from "react";

export const Dialog = forwardRef(
	(
		{
			header,
			main,
			onClick,
		}: {
			header: Record<string, string>;
			main: Record<string, string>;
			onClick: MouseEventHandler<HTMLButtonElement>
		},
		ref: ForwardedRef<HTMLDialogElement | null>,
	) => {
		return (
			<dialog ref={ref}>
				<header>
					<h2>{header.title}</h2>
					<button onClick={onClick}>
						<span></span>
						<span></span>
					</button>
				</header>
				<div>{main.textContent}</div>
			</dialog>
		);
	},
);
