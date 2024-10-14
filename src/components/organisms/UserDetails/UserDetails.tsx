"use client";

import { ErrorMessage, FormUserDetails, FormUserPassword } from "@/components/mod";
import { SetterType, store, useUserDetailsStore } from "@/store/mod";
import { UserType } from "@/services/mod";
import { useEffect } from "react";

export const UserDetails = ({ user }: { user: UserType | null }) => {
	const [setUser] = store(useUserDetailsStore, "setUser") as [
		SetterType<UserType>,
	];

	useEffect(() => {
		if (user && user["firstname"]) {
			setUser(user);
		}
	}, [user, setUser]);

	return (
		<div id="user-details">
			<h1 className="px-10 py-4">Modifier votre profil</h1>
			{user ? (
				"message" in user ? (
					<ErrorMessage
						content={{
							FR: "Aucun utilisateur trouvé",
							EN: "No user data found",
						}}
					/>
				) : (
					<>
						<FormUserDetails />
						<FormUserPassword />
					</>
				)
			) : null}
		</div>
	);
};
