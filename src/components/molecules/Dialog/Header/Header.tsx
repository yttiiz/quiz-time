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
					<h3>{title}</h3>
					<span>{details}</span>
				</div>
			) : (
				<h3>{title}</h3>
			)}
			<button
				onClick={onClick}
				type="button"
			>
				<span></span>
				<span></span>
			</button>
		</header>
	);
};
