"use client";

import { UserType } from "@/services/mod";

export const UserDetails = ({ user, id }: { user: UserType; id: string }) => {
	return (
		<>
			<h1>Modifier votre profil</h1>
			{user["firstname"] ? (
				<div id={id}>{user.firstname}</div>
			) : (
				<div>No user</div>
			)}
		</>
	);
};
