import { Burger, Logo } from "@/components/mod";
import { Fetcher } from "@/utils/mod";
const { PAGE_TITLE, __NEXT_PRIVATE_ORIGIN } = process.env;

export const Header = async () => {
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
				<Burger items={await Fetcher.getData(__NEXT_PRIVATE_ORIGIN)} />
			</div>
		</header>
	);
};
