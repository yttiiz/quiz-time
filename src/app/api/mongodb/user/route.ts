import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Mongo } from "@/services/mod";

export async function POST(req: NextRequest) {
	const value = (await req.formData()).get("value");
	const isValueAString = !!value && !(value instanceof File);

	if (isValueAString) {
		const { email, password } = JSON.parse(value);
    // Do stuff
	}

	return NextResponse.json({ message: "Incorrect value given." });
}
