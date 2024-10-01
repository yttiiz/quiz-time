"use client";

import { userModificationServerAction } from "@/actions/actions";
import {
	Button,
	FormModifyState,
	IconUser,
	Input,
} from "@/components/mod";
import { useUserDetailsStore } from "@/store/store";
import {
	FormEvent,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
} from "react";
import { useFormState } from "react-dom";

export const FormUserDetails = () => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const user = useUserDetailsStore((state) => state.user);
	const [errorFirstnameMessage, setErrorFirstnameMessage] = useState("");
	const [errorLastnameMessage, setErrorLastnameMessage] = useState("");
	const [errorEmailMessage, setErrorEmailMessage] = useState("");

	const [{ message }, formAction] = useFormState(userModificationServerAction, {
		message: "",
	});

	const initializerArg = useMemo(
		() => ({
			firstname: "",
			lastname: "",
			email: "",
		}),
		[],
	);

	const [{ firstname, lastname, email }, dispatch] = useReducer(
		(
			state: FormModifyState,
			action: {
				type: "firstname" | "lastname" | "email";
				payload: string;
			},
		) => {
			switch (action.type) {
				case "firstname": {
					return { ...state, firstname: action.payload };
				}

				case "lastname": {
					return { ...state, lastname: action.payload };
				}

				case "email": {
					return { ...state, email: action.payload };
				}
			}
		},
		initializerArg,
	);

	const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
		if (formRef && formRef.current) {
			if (!firstname) {
				setErrorFirstnameMessage("Veuillez renseigner ce champ.");
				event.preventDefault();
			}
			
			if (!lastname) {
				setErrorLastnameMessage("Veuillez renseigner ce champ.");
				event.preventDefault();
			}

			if (!email) {
				setErrorEmailMessage("Veuillez renseigner ce champ.");
				event.preventDefault();
			}
		}
	};

	useEffect(() => {
		if (message.includes("User")) {
			if (message.includes("connected")) {
				dispatch({ type: "email", payload: "" });

				const userFirstname = message.split(": ")[1].trim();

				// Set firstname.
				globalThis.localStorage.setItem("userFirstname", userFirstname);

				// Redirect to home page.
				globalThis.location.href = "/";
			} else {
				setErrorEmailMessage("Email inconnu");
			}

			return;
		}

		if (user) {
			(Object.keys(initializerArg) as (keyof FormModifyState)[]).map((key) => {
				dispatch({ type: key, payload: user[key] });
			});
		}
	}, [message, user, initializerArg]);

	return (
		<form
			ref={formRef}
			action={formAction}
			className="grid gap-4 p-10"
			onSubmit={onSubmitHandler}
		>
			<Input
				label="Prénom"
				name="firstname"
				type="firstname"
				value={firstname}
				required={true}
				leadingIcon={
					<IconUser
						variant="primary"
						model="content"
						svgSize="xl"
					/>
				}
				feedbackMessage={errorFirstnameMessage}
				onInput={(event) => {
					dispatch({ type: "firstname", payload: event.currentTarget.value });
					if (errorFirstnameMessage) setErrorFirstnameMessage("");
				}}
			/>
			<Input
				label="Nom"
				name="lastname"
				type="lastname"
				value={lastname}
				required={true}
				leadingIcon={
					<IconUser
						variant="primary"
						model="content"
						svgSize="xl"
					/>
				}
				feedbackMessage={errorLastnameMessage}
				onInput={(event) => {
					dispatch({ type: "lastname", payload: event.currentTarget.value });
					if (errorLastnameMessage) setErrorLastnameMessage("");
				}}
			/>
			<Input
				label="Email"
				name="email"
				type="email"
				value={email}
				required={true}
				leadingIcon={
					<IconUser
						variant="primary"
						model="content"
						svgSize="xl"
					/>
				}
				feedbackMessage={errorEmailMessage}
				onInput={(event) => {
					dispatch({ type: "email", payload: event.currentTarget.value });
					if (errorEmailMessage) setErrorEmailMessage("");
				}}
			/>
			<Button
				type="submit"
				textContent="Envoyer"
				variant="secondary"
				spacing="4"
			/>
		</form>
	);
};
