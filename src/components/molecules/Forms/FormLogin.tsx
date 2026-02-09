"use client";

import { handleCredentialsSignIn } from "@/actions/authActions";
import {
  Button,
  Input,
  InputWithForgotPassword,
} from "@/components/client.mod";
import {
  FormLoginState,
  IconCrossEye,
  IconEye,
  IconUnlocked,
  IconUser,
} from "@/components/mod";
import { SubmitEvent, useReducer, useState } from "react";

export const FormLogin = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

  const [{ email, password }, dispatch] = useReducer(
    (
      state: FormLoginState,
      action: { type: "email" | "password"; payload: string },
    ) => {
      switch (action.type) {
        case "email": {
          return { ...state, email: action.payload };
        }

        case "password": {
          return { ...state, password: action.payload };
        }
      }
    },
    {
      email: "",
      password: "",
    },
  );

  const getData = (formData: FormData) => {
    return {
      email: formData.get("email"),
      password: formData.get("password"),
    };
  };

  const formServerAction = async (formData: FormData) => {
    const { email, password } = getData(formData);
    const isDataIsString =
      typeof email === "string" && typeof password === "string";

    if (isDataIsString) {
      const result = await handleCredentialsSignIn({ email, password });

      if (result) {
        result.message.includes("credentials")
          ? setErrorPasswordMessage("Mot de passe incorrect.")
          : null;
      }
    }
  };

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const { email, password } = getData(formData);

    if (!email) {
      setErrorEmailMessage("Veuillez renseigner ce champ.");
      event.preventDefault();
    }

    if (!password) {
      setErrorPasswordMessage("Veuillez renseigner ce champ.");
      event.preventDefault();
    }
  };

  return (
    <form
      action={formServerAction}
      onSubmit={onSubmit}
      className="grid gap-4 p-10"
    >
      <Input
        label="Email"
        name="email"
        type="email"
        value={email}
        required={true}
        leadingIcon={
          <IconUser variant="primary" model="content" svgSize="xl" />
        }
        feedbackMessage={errorEmailMessage}
        onInput={(event) => {
          dispatch({ type: "email", payload: event.currentTarget.value });
          if (errorEmailMessage) setErrorEmailMessage("");
        }}
      />
      <InputWithForgotPassword
        type={isEyeOpen ? "text" : "password"}
        value={password}
        required={true}
        leadingIcon={
          <IconUnlocked variant="primary" model="content" svgSize="xl" />
        }
        trailingIcon={
          isEyeOpen ? (
            <IconEye variant="primary" model="content" svgSize="lg" />
          ) : (
            <IconCrossEye variant="primary" model="content" svgSize="lg" />
          )
        }
        feedbackMessage={errorPasswordMessage}
        onClickPasswordButton={() => setIsEyeOpen(!isEyeOpen)}
        onInput={(event) => {
          dispatch({ type: "password", payload: event.currentTarget.value });
          if (errorPasswordMessage) setErrorPasswordMessage("");
        }}
      />
      <Button
        type="submit"
        textContent="Connexion"
        variant="secondary"
        spacing="4"
      />
    </form>
  );
};
