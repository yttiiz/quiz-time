"use client";

import { Button } from "@/components/mod";
import { MouseEvent } from "react";

export const GetStartedButton = () => {
	const onButtonClick = (event: MouseEvent) => {
		// Doing stuff here.
	};

	return (
		<div className="pt-10 text-center">
			<Button
				textContent={"Commencer"}
				variant={"secondary"}
				radius={"md"}
				spacing={"4"}
        className={"font-semibold"}
				onClick={onButtonClick}
			/>
		</div>
	);
};
