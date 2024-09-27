"use client";

import { SetterType } from "@/store/mod";
import { store, useUserDataStore } from "@/store/mod";
import { useEffect } from "react";

export const UserDetailsLink = () => {
	const [firstname, setFirstname] = store(useUserDataStore, "firstname", "setFirstname") as [
		string,
		SetterType<string>,
	];

  const greets = () => {
		const hours = new Date().getHours();
		return hours >= 18 || hours < 6 ? "Bonsoir" : "Bonjour";
	};

	useEffect(() => {
		if (!firstname) {
			if (globalThis.localStorage.getItem("userFirstname")) {
				setFirstname(
					globalThis.localStorage.getItem("userFirstname") as string,
				);
			}
		}
	}, [firstname, setFirstname]);

	return !!firstname ? (
		<div className="flex items-center gap-3">
			<span>|</span>
			<span className="py-2">
				<strong className="text-secondary-default font-normal">
					{greets()}{" "}
					<a
						href="/user-details"
						className="font-bold hover:underline"
					>
						{firstname}
					</a>
				</strong>
			</span>
		</div>
	) : null;
};
