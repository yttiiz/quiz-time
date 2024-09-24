import { Fetcher } from "@yttiiz/utils";
import { OpenWeather } from "@/utils/mod";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type CoordsType =
	| {
			latitude: number;
			longitude: number;
	  }
	| { message: string };

export async function POST(req: NextRequest) {
	const { OPENWEATHER_API_KEY } = process.env;
	const stringifyCoords = (await req.formData()).get("value");
	const value: CoordsType = JSON.parse(stringifyCoords as string);

  // Sainte-Anne coordonates (default).
	let latitude = 16.2333;
	let longitude = -61.3833;
	
	if ("latitude" in value) {
		latitude = value.latitude;
		longitude = value.longitude;
	}

	const api = OpenWeather.getApi({
		latitude,
		longitude,
		apiKey: OPENWEATHER_API_KEY as string,
	});
	const response = await Fetcher.getData(api);

	return NextResponse.json(response);
}
