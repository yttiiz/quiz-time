import { Burger, Logo, WeatherWidget } from "@/components/mod";
import { ErrorResponseType, SuccessResponseType } from "@yttiiz/utils";

export const Header = async ({
	title,
	host,
	response,
}: {
	title: string | undefined;
	host: string | undefined;
	response: SuccessResponseType | ErrorResponseType;
}) => {
	return (
		<header id="main-header">
			<div className="container flex justify-between items-center h-full">
				<a
					href="/"
					className="flex gap-3 items-center"
				>
					<Logo />
					<p>{title}</p>
				</a>
				<div className="flex items-center gap-4">
					<WeatherWidget host={host} />
					<Burger response={response} />
				</div>
			</div>
		</header>
	);
};
