import { Logo } from "@/components/mod";
import { HeaderPropsType } from "../mod";

export const Header = ({ title, items }: HeaderPropsType) => {
	return (
		<header className="main-header bg-primary-default">
			<div className="container flex justify-between h-full">
				<a
					href="/"
					className="flex gap-3 items-center"
				>
					<Logo />
					<p>{title}</p>
				</a>
				<nav>
					<ul>
						{items.map((item, index) => (
							<li key={index}>
								<a href={item.url}>{item.textContent}</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};
