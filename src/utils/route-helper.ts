import type { NextRequest } from "next/server";

export class RouteHelper {
	/**
	 * Returns an object containing the value and a boolean to insure or not this value is a string.
	 * @param req
	 */
	public static async getValueAsString(req: NextRequest) {
		const value = (await req.formData()).get("value");
		const isValueAstring = !!value && !(value instanceof File);

		return {
			value: isValueAstring ? value : "",
			isValueAstring,
		};
	}
}
