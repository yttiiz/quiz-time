import { MouseEventHandler } from "react";
import { DialogHeaderPropsType } from "../../types";

export const DialogHeader = ({
	title,
	details,
	onClick,
}: DialogHeaderPropsType & {
	onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
	return (
		<header>
			{details ? (
				<div className="flex flex-col gap-2">
					<h2>{title}</h2>
					<span>{details}</span>
				</div>
			) : (
				<h2>{title}</h2>
			)}
			<button onClick={onClick}>
				<span></span>
				<span></span>
			</button>
		</header>
	);
};
