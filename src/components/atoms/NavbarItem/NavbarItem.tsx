import { IconOnOff } from "../mod";
import { NavbarItemPropsType } from "../types";

export const NavbarItem = (
	{ textContent, url, isFormConnexion }: NavbarItemPropsType,
	key: string,
) => {
	return (
		<li
			key={key}
			className="w-full h-max"
		>
			{isFormConnexion ? (
				<form action={() => console.log("Hello Test")}>
					<button
						type="submit"
						data-user="deconnexion"
						className="hover:text-alert-default"
					>
						{textContent}
            <IconOnOff
              variant="primary"
              model="content"
            />
					</button>
				</form>
			) : (
				<a
					className="hover:text-alert-default"
					href={url}
				>
					{textContent}
				</a>
			)}
		</li>
	);
};
