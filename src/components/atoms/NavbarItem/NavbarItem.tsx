"use client";

import { IconOnOff } from "../mod";
import { NavbarItemPropsType } from "../types";
import { handleSignOut } from "@/actions/authActions";

export const NavbarItem = (
	{ textContent, url, isFormConnexion }: NavbarItemPropsType,
) => {
	return (
		<li
			className="w-full h-max"
		>
			{isFormConnexion ? (
				<form
					action={handleSignOut}
				>
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
