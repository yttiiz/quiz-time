import { load } from "cheerio";

type DataCheerioType = {
	image: {
		src: string;
		width: string;
		height: string;
	};
	title: string;
	link: string;
};

export class Cheerio {
	private static init(content: string) {
		return load(content);
	}

	public static async getNewsDataFrom(
		address: string | undefined,
		selectors: string,
	) {
		if (address) {
			const response = await fetch(address);
			const data: Record<string, DataCheerioType> = {};
			let index = 1;

			if (response.ok && response.status === 200) {
				const [mainSelector, secondarySelector] = selectors.split(" ");
				const dom = await response.text();
				const $ = Cheerio.init(dom);

				$(mainSelector, dom).each(function () {
					const $this = $(this);

					const $image = $this.children(secondarySelector).find("img")["0"][
						"attribs"
					];

					const $link = $this
						.children(secondarySelector)
						.find(".et_pb_button_wrapper")
						.children("a")["0"]["attribs"]["href"];

					const $title = $this
						.children(secondarySelector)
						.find("h2")
						.children("a")
						.text()
						.replace(" : le résumé de la semaine", "");

					const { src, width, height } = $image;

					data[index] = {
						image: {
							src,
							width,
							height,
						},
						title: $title,
						link: $link,
					};

					index++;
				});

				return data;
			}
		}
	}
}
