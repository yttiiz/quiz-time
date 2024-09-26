import { FileHelper } from "@/utils/file-helper";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const stringifyData = (await req.formData()).get("value");
	const { file } = JSON.parse(stringifyData as string);
	const data = await FileHelper.convertJsonToObject(`src/data/${file}.json`);

	return NextResponse.json(data);
}
