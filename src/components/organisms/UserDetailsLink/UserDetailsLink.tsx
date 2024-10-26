import { auth } from "@/auth";

export const UserDetailsLink = async () => {
	const session = await auth();
	const firstname = session?.user?.name?.split(" ").at(0);

  const greets = () => {
		const hours = new Date().getHours();
		return hours >= 18 || hours < 6 ? "Bonsoir" : "Bonjour";
	};

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
