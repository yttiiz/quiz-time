import { Fetcher } from "@yttiiz/utils";

export const Footer = async () => {
	const { __NEXT_PRIVATE_ORIGIN: host } = process.env;
  const response = await Fetcher.postData(
		`${host}/api/json`,
		{
			file: "footer",
		},
		"next",
	);

  let links: { textContent: string; url: string; }[] = [];

  response.ok
    ? links = [...response.data as unknown as { textContent: string; url: string; }[]]
    : links.push({ textContent: "accueil", url: "/" });

  return (
			<footer className="bg-primary-content/10">
        <div className="container py-8">
          <ul>
            {links.map(({ textContent, url }) => (
              <li key={(Math.random() + 1) * 1000}>
                <a href={url}>{textContent}</a>
              </li>
            ))
            }
          </ul>
        </div>
      </footer>
  );
};