import { readFile } from "fs/promises";

export class Helper {
  /**
   * Converts json file into a javascript object.
   * @param path 
   */
	public static async convertJsonToObject(path: string) {
    path = path.indexOf("/") === 0 ? path : `/${path}`;
    
		const data = await readFile(process.cwd() + path, { encoding: "utf-8" });
		return JSON.parse(data);
	}
}
