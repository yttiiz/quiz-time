"use client";

import { useEffect, useState } from "react";

export const ErrorMessage = ({
	content,
}: {
	content: { FR: string; EN: string },
}) => {
	const [isFrenchBrowser, setIsFrenchBrowser] = useState(false);

	useEffect(() => {
		setIsFrenchBrowser(globalThis.navigator?.language === "fr-FR" ?? true);
	}, [setIsFrenchBrowser]);

	return (
		<div className="p-4 border-2 border-primary-default rounded-md">
			{isFrenchBrowser ? content["FR"] : content["EN"]}
		</div>
	);
};
