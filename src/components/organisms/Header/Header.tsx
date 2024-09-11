import { Burger, Logo, WeatherWidget } from "@/components/mod";
import { Fetcher } from "@yttiiz/utils";

export const Header = async () => {
	const { PAGE_TITLE, __NEXT_PRIVATE_ORIGIN: host } = process.env;
	const response = await Fetcher.postData(
		`${host}/api/json`,
		{
			file: "header",
		},
		"next",
	);

	return (
		<header className="main-header">
			<div className="container flex justify-between items-center h-full">
				<a
					href="/"
					className="flex gap-3 items-center"
				>
					<Logo />
					<p>{PAGE_TITLE}</p>
				</a>
				<div className="flex items-center gap-4">
					<WeatherWidget host={host} />
					<Burger response={response} />
				</div>
			</div>
		</header>
	);
};
