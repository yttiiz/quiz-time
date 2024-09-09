"use client";

import { useEffect, useState } from "react";
import { IconWarning } from "../mod";
import { VariantType } from "@/components/mod";

export const ErrorMessage = ({
	content,
	variant = "primary",
}: {
	content: { FR: string; EN: string };
	variant?: VariantType;
}) => {
	const className = `flex gap-4 items-center p-4 border-2 border-${variant}-default rounded-md`;
	const [isFrenchBrowser, setIsFrenchBrowser] = useState(false);

	useEffect(() => {
		setIsFrenchBrowser(globalThis.navigator?.language === "fr-FR" ?? true);
	}, [setIsFrenchBrowser]);

	return (
		<div className={className}>
			<IconWarning variant={variant} />
			{isFrenchBrowser ? content["FR"] : content["EN"]}.
		</div>
	);
};
