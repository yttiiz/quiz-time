import { NavbarItemType } from "@/components/types";
import { Helper } from "@/utils/helper";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(_: NextRequest) {
	const { items }: { items: NavbarItemType[] } =
		await Helper.convertJsonToObject("src/data/header.json");

	return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
	const stringifyData = (await req.formData()).get("value");
	const { file } = JSON.parse(stringifyData as string);
	const data = await Helper.convertJsonToObject(`src/data/${file}.json`);

	return NextResponse.json(data);
}