import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { RouteHelper } from "@/utils/route-helper";
import { Mongo } from "@/services/mod";

export async function POST(req: NextRequest) {
  const { value, isValueAstring } = await RouteHelper.getValueAsString(req);

	if (isValueAstring) {
		const { email, password } = JSON.parse(value);
    // Do stuff
	}

	return NextResponse.json({ message: "Incorrect value given." });
}
