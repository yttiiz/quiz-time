import { genSalt, compare, hash } from "bcrypt";

export class Crypto {
	private static characters =
		"abcdefghijkmnopqrsqrstuvwxyZABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

	/**
	 * Creates a password with letters (uppercase & lowercase) and numbers.
	 * @param length password length
	 */
	public static generatePassword(length = 12) {
		let password = "";

		for (let i = 0; i <= length; i++) {
			const index = Math.floor(
				Math.random() * (Crypto.characters.length - 1) + 1,
			);
			password += Crypto.characters[index];
		}

		return password;
	}

	/**
	 * Creates a hash bind to the given password.
	 * @param password 
	 * @param sizeSalt 
	 */
	public static async hashPassword(password: string, sizeSalt: number = 10) {
		const salt = await genSalt(sizeSalt);
		return await hash(password, salt);
	}

	/**
	 * Checks if password is correct comparing to the hash.
	 * @param password 
	 * @param hash 
	 */
	public static async isPasswordOk(password: string, hash: string) {
		return await compare(password, hash);
	}
}
