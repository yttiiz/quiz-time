import { HeaderPropsType } from "../mod";

export const Header = ({ title, items }: HeaderPropsType) => {
	return (
		<header>
			<div>
				<span>Logo</span>
				<p>{title}</p>
			</div>
			<nav>
				<ul>{items.map((item, index) => (
          <li key={index}>
            <a href={item.url}>{item.textContent}</a>
          </li>
        ))}</ul>
			</nav>
		</header>
	);
};
