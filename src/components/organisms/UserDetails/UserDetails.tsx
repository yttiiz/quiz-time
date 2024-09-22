"use client";

import { SetterType } from "@/store/mod";
import { store, useUserDataStore } from "@/store/mod";
import { useEffect } from "react";

export const UserDetails = () => {
	const firstname = useUserDataStore((state) => state.firstname);
	const [setFirstname] = store(useUserDataStore, "setFirstname") as [
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
		<div
			id="user-details"
			className="bg-primary-content/5 text-alert-default"
		>
			<div className="container py-2">
				{greets()} <b>{firstname}</b>
			</div>
		</div>
	) : null;
};
