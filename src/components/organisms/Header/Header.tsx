import { auth } from "@/auth";
import { Burger, ItemType, Logo, UserDetailsLink, WeatherWidget } from "@/components/mod";
import { ErrorResponseType, SuccessResponseType } from "@yttiiz/utils";

export const Header = async ({
	title,
	host,
	response,
}: {
	title: string | undefined;
	host: string | undefined;
	response: SuccessResponseType<{ items: ItemType[] }> | ErrorResponseType;
}) => {
	const session = await auth();

	return (
		<header id="main-header">
			<div className="container flex justify-between items-center h-full">
				<div className="flex gap-3 items-center">
					<a
						href="/"
						className="flex gap-3 items-center"
					>
						<Logo />
						<p>{title}</p>
					</a>
					<UserDetailsLink />
				</div>
				<div className="flex items-center gap-4">
					<WeatherWidget host={host} />
					<Burger
						response={response}
						session={session}
					/>
				</div>
			</div>
		</header>
	);
};
