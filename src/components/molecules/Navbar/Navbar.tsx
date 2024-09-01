import { NavbarPropsType } from "../types";

export const Navbar = ({ items }: NavbarPropsType) => {
  return (
    <nav className="header-navbar">
      <ul className="bg-primary-content text-primary-default">
        {items.map((item, index) => (
          <li key={index} className="w-full h-max">
            <a className="flex p-2 hover:bg-secondary-default" href={item.url}>{item.textContent}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};