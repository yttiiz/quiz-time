"use client";

import { IconOnOff } from "../mod";
import { ItemType, NavbarItemPropsType } from "../types";
import { store, useHeaderStore } from "@/store/mod";
import { SetterType } from "@/store/types";
import { Fetcher } from "@yttiiz/utils";
import { handleSignOut } from "@/actions/authActions";

export const NavbarItem = (
	{ textContent, url, isFormConnexion }: NavbarItemPropsType,
	key: string,
) => {
	const [setItems] = store(useHeaderStore, "setItems") as [
		SetterType<ItemType[]>,
	];

	const onSubmit = () => {
		Fetcher.postData<{ items: ItemType[] }>(
			`${globalThis.location.origin}/api/json`,
			{
				file: "header",
			},
			"next",
		)
			.then((res) => (res.ok ? res.data : res.message))
			.then((data) =>
				typeof data !== "string" ? setItems(data["items"]) : null,
			);
	};

	return (
		<li
			key={key}
			className="w-full h-max"
		>
			{isFormConnexion ? (
				<form
					action={handleSignOut}
					onSubmit={onSubmit}
				>
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
