import { load } from "cheerio";

type DataCheerioType = {
	image: {
		src: string;
		width: string;
		height: string;
	};
	title: string;
};

export class Cheerio {
	private static init(content: string) {
		return load(content);
	}

	public static async getDataFrom(address: string, selectors: string) {
		const response = await fetch(address);
		const data: Record<string, DataCheerioType> = {};
		let index = 1;

		if (response.ok && response.status === 200) {
			const [mainSelector, secondarySelector] = selectors.split(" ");
			const dom = await response.text();
			const $ = Cheerio.init(dom);

			$(mainSelector, dom).each(function () {
				const $this = $(this);

				const $image = $this
          .children(secondarySelector)
          .find("img")["0"]["attribs"];

				const $title = $this
					.children(secondarySelector)
					.find("h2")
					.children("a")
					.text();

				const { src, width, height } = $image;

				data[index] = {
					image: {
						src,
						width,
						height,
					},
					title: $title,
				};

				index++;
			});

			return data;
		}
	}
}
