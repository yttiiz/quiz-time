"use client";

import { MouseEventHandler, useState } from "react";
import { DialogMainPropsType } from "../../types";
import { Button, Input } from "@/components/mod";

export const DialogBodyWithFieldText = ({
	paragraph,
	onClick,
}: DialogMainPropsType & { onClick: MouseEventHandler<HTMLButtonElement> }) => {
	const [inputValue, setInputValue] = useState("");

	return (
		<div>
			<p>{paragraph}</p>
      <Input
        label="Votre email"
        value={inputValue}
        onInput={(event) => setInputValue(event.currentTarget.value)}
      />
      <Button
        dataBind={inputValue}
        textContent="Envoyer"
        type="button"
        onClick={(event) => {
          onClick(event);
          setInputValue("");
        }}
      />
		</div>
	);
};
