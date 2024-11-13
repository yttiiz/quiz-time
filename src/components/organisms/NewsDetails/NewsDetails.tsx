import { Cheerio } from "@/utils/mod";
import Image from "next/image";

export const NewsDetails = async () => {
  const url = process.env.RATTRAPAGE_ACTU_URL;
	const data = await Cheerio.getNewsDataFrom(
		url,
		".et_pb_slide .et_pb_container",
	);

	return data ? (
    <>
      <h1 className="mb-8">Actualités</h1>
      <ul>
        {Object.keys(data).map((key) => {
          const {
            title,
            image: { src, height, width },
            link,
          } = data[key];

          return (
            <li key={key}>
              <h3>{title}</h3>
              <Image
                src={src}
                alt={src}
                height={+height}
                width={+width}
                priority={false}
              />
              <a
                href={link}
                target="_blank"
              >
                Voir plus...
              </a>
            </li>
          );
        })}
      </ul>
    </>
	) : (
		<div>No data</div>
	);
};
