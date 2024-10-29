import { UserSchemaType } from "@/services/mod";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Fetcher } from "@yttiiz/utils";
import { NextResponse } from "next/server";

// Extends User properties.
declare module "next-auth" {
	interface Session {
		user: {
			role: "admin" | "user";
		} & DefaultSession["user"];
	}
}

export const { auth, handlers, signIn, signOut } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				const { email, password } = credentials;
				const { APP_URL: host } = process.env;

				const response = await Fetcher.getData<
					{ message: string } | { user: UserSchemaType }
				>(
					host + "/api/mongodb/user",
					`email=${encodeURIComponent(email as string)}&password=${encodeURIComponent(password as string)}`,
				);

				if (response.ok) {
					if ("user" in response.data) {
						const { _id, firstname, lastname, email, role } =
							response.data.user;

						return {
							id: _id.toString(),
							name: `${firstname} ${lastname}`,
							email,
							role,
						};
					}
					return null;
				}

				return null;
			},
		}),
	],
	callbacks: {
		authorized: async ({ request: { nextUrl }, auth }) => {
			const isLoggedIn = !!auth?.user;
			const { pathname } = nextUrl;
			const role = auth?.user.role;

			if (pathname.includes("/login") && isLoggedIn) {
				return NextResponse.redirect(new URL("/", nextUrl));
			}
			
			if (pathname.includes("/admin") && role !== "admin") {
				return NextResponse.redirect(new URL("/", nextUrl));
			}

			return true;
		},
	},
	pages: {
		signIn: "/login",
	},
});
