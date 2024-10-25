import { UserSchemaType } from "@/services/mod";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Fetcher } from "@yttiiz/utils";

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
						const { _id, firstname, lastname, email } = response.data.user;

						return {
							id: _id.toString(),
							name: `${firstname} ${lastname}`,
							email,
						};
					}
					return null;
				}

				return null;
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
});
