import { MouseEventHandler } from "react";
import { DialogMainPropsType } from "../../types";
import { Button } from "@/components/mod";

export const DialogBody = ({
	paragraph,
	buttons,
	onClick,
}: DialogMainPropsType & { onClick: MouseEventHandler<HTMLButtonElement> }) => {
	return (
		<div>
			{buttons ? (
				<>
					<p>{paragraph}</p>
					<div>
						{buttons.map((button, index) =>
							index === 0 ? (
								<Button
									key={(Math.random() + 1) * 1000}
									textContent={button}
									type="button"
									onClick={onClick}
								/>
							) : (
								<Button
									key={(Math.random() + 1) * 1000}
									textContent={button}
									type="button"
								/>
							),
						)}
					</div>
				</>
			) : (
				<p>{paragraph}</p>
			)}
		</div>
	);
};
