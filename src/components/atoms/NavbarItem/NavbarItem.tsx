import { NavbarItemPropsType } from "../types";

export const NavbarItem = ({ textContent, url }: NavbarItemPropsType, key: string) => {
  return (
    <li
      key={key}
      className="w-full h-max"
    >
      <a
        className="flex p-2 hover:bg-secondary-default"
        href={url}
      >
        {textContent}
      </a>
    </li>
  );
};