import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				let user = null;

        //TODO WIP - User test example.
				user = {
					id: 1,
					firstname: "John",
					lastname: "Doe",
				} as unknown as User;

				if (!user) return null;

				return user;
			},
		}),
	],
});
