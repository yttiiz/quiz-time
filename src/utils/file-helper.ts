import { readFile, writeFile } from "fs/promises";

export class FileHelper {
	/**
	 * Parses string to prevent relative path error.
	 * @param path
	 */
	private static parsePath(path: string) {
		return path.indexOf("/") === 0 ? path : `/${path}`;
	}

	/**
	 * Converts json file into a javascript object.
	 * @param path
	 */
	public static async convertJsonToObject(path: string) {
		const data = await readFile(process.cwd() + FileHelper.parsePath(path), {
			encoding: "utf-8",
		});

		return JSON.parse(data);
	}

	/**
	 * Writes some content into a file bind to the given `path`.
	 * @param path
	 * @param data
	 */
	public static async writeLog(path: string, data: string) {
		const content = new Uint8Array(Buffer.from(data));
		let isOk = false;

		try {
			writeFile(process.cwd() + FileHelper.parsePath(path), content, {
				encoding: "utf-8",
				flag: "a+",
			});
			return (isOk = true);
		} catch (error) {
			console.log(error);
			return isOk;
		}
	}
}
