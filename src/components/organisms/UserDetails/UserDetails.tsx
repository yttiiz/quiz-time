"use client";

import { ErrorMessage, FormUserDetails } from "@/components/mod";
import { UserType } from "@/services/mod";

export const UserDetails = ({
	user,
}: {
	user: UserType | null;
}) => {
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
					<FormUserDetails user={user} />
				)
			) : null}
		</div>
	);
};
