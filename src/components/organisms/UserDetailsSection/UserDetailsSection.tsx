import { UserDetails } from "@/components/mod";
import { UserType } from "@/services/mod";
import { Fetcher } from "@yttiiz/utils";

export const UserDetailsSection = async () => {
	const { __NEXT_PRIVATE_ORIGIN: host } = process.env;
	const email = "dimitri.talis@orange.fr"; // WIP way to retreive user email.

	let user: UserType | null;
	const response = await Fetcher.getData<UserType>(
		host + "/api/mongodb/user-details",
		`email=${encodeURIComponent(email)}`,
	);

	response.ok ? (user = { ...response.data }) : (user = null);

	return (
		<section className="user-details">
			<div className="container grid h-full items-center">
				<UserDetails user={user} />
			</div>
		</section>
	);
};
