import { Fetcher } from "@/utils/fetcher";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { MONGO_API_URL, MONGO_API_KEY } = process.env;
	const response = await Fetcher.getData(
		MONGO_API_URL + "?apiKey=" + MONGO_API_KEY,
	);

	return response.ok
		? NextResponse.json(response.data)
		: NextResponse.json(response.message);
}
