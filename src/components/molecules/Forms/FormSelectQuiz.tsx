"use client";

import { selectQuizServerAction } from "@/actions/actions";
import { Button, Dialog, Select } from "@/components/client.mod";
import { IconElearning, SelectOptionsType } from "@/components/mod";
import { DomHelper } from "@/utils/mod";
import { useActionState, useEffect, useRef } from "react";

export const FormSelectQuiz = ({
  data,
}: {
  data: {
    title: string;
    options: SelectOptionsType[];
  };
}) => {
  const [{ message }, formAction] = useActionState(selectQuizServerAction, {
    message: "",
  });
  const { title, options } = data;
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (message) {
      if (message.includes("No item selected")) {
        return DomHelper.openDialog(dialogRef);
      }

      globalThis.location.href = "/quiz/" + message;
    }
  }, [message]);

  return (
    <>
      <form action={formAction}>
        <h3 className="flex flex-col md:flex-row text-center md:text-left gap-4 items-center">
          <IconElearning variant="secondary" />
          {title}
        </h3>
        <Select
          name="select-quiz"
          options={options}
          placeholder="Choisissez votre thème..."
        />
        <Button
          textContent="Envoyer"
          type="submit"
          spacing="2"
          radius="md"
          className="w-full md:w-max"
        />
      </form>
      <Dialog
        onCrossButtonClick={() => DomHelper.closeDialog(dialogRef)}
        onMainButtonClick={() => DomHelper.closeDialog(dialogRef)}
        ref={dialogRef}
        header={{ title: "Quiz formulaire" }}
        main={{
          paragraph: "Vous devez sélectionner un thème pour pouvoir continuer.",
          buttons: ["fermer"],
        }}
      />
    </>
  );
};
