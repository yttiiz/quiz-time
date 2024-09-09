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

	return <div>{isFrenchBrowser ? content["FR"] : content["EN"]}</div>;
};
