import { UserDetails } from "@/components/mod";

export const UserDetailsSection = async () => {
	return (
		<section className="user-details">
			<div className="container grid h-full items-center">
				<UserDetails />
			</div>
		</section>
	);
};
