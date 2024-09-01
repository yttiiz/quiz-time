import { Burger, Logo } from "@/components/mod";

const { PAGE_TITLE } = process.env;

export const Header = () => {
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
				<Burger />
			</div>
		</header>
	);
};
