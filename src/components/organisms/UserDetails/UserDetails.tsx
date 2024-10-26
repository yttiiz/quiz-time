import {
	ErrorMessage,
	FormUserDetails,
	FormUserPassword,
} from "@/components/mod";
import { auth } from "@/auth";

export const UserDetails = async () => {
	const session = await auth();
	const user = session?.user;

	return (
		<div id="user-details">
			<h1 className="px-10 py-4">Modifier votre profil</h1>
			{user ? (
				<>
					<FormUserDetails user={user}/>
					<FormUserPassword />
				</>
			) : (
				<ErrorMessage
					content={{
						FR: "Aucun utilisateur trouvé",
						EN: "No user data found",
					}}
				/>
			)}
		</div>
	);
};
