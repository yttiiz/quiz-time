"use client";

import { signOutServerAction } from "@/actions/actions";
import { IconOnOff } from "../mod";
import { ItemType, NavbarItemPropsType } from "../types";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { store, useHeaderStore, useUserDataStore } from "@/store/mod";
import { SetterType } from "@/store/types";
import { Fetcher } from "@yttiiz/utils";

export const NavbarItem = (
	{ textContent, url, isFormConnexion }: NavbarItemPropsType,
	key: string,
) => {
	const [{ message }, formAction] = useFormState(signOutServerAction, {
		message: "",
	});

	const [setFirstname] = store(useUserDataStore, "setFirstname") as [
		SetterType<string>,
	];
	const [setItems] = store(useHeaderStore, "setItems") as [
		SetterType<ItemType[]>,
	];

	useEffect(() => {
		if (message.includes("disconnected")) {
			Fetcher.postData(
				`${globalThis.location.origin}/api/json`,
				{
					file: "header",
				},
				"next",
			)
				.then((res) => (res.ok ? res.data : res.message))
				.then((data) => {
					setItems(data["items" as keyof typeof data] as unknown as ItemType[]);
				});

			setFirstname("");
		}
	}, [message, setFirstname, setItems]);

	return (
		<li
			key={key}
			className="w-full h-max"
		>
			{isFormConnexion ? (
				<form action={formAction}>
					<button
						type="submit"
						data-user="deconnexion"
						className="hover:text-alert-default"
					>
						{textContent}
						<IconOnOff
							variant="primary"
							model="content"
						/>
					</button>
				</form>
			) : (
				<a
					className="hover:text-alert-default"
					href={url}
				>
					{textContent}
				</a>
			)}
		</li>
	);
};
