import { MainLayout } from "@/components/mod";
import { QuestionType } from "@/services/mod";
import { Fetcher } from "@yttiiz/utils";

export default async function Javascript() {
	const { __NEXT_PRIVATE_ORIGIN: host } = process.env;
	const response = await Fetcher.postData(
		host + "/api/mongodb",
		{
			quiz: "javascript",
		},
		"next",
	);

	return (
		<MainLayout>
			<section id="hero-js">
				<div className="container">
					<h1>Javascript Quiz</h1>
					<div>
						{response.ok
						? (
							<ul>
								{(response.data as unknown as QuestionType[])
								.map((document, index) => (
									<li key={index + ((Math.random() + 1) * 1000)}>
										<h2>{document.question.title}</h2>
										<ul>
											{document.question.propositions
											.map((question, key) => (
												<li key={key + ((Math.random() + 1) * 1000)}>
													{question}
												</li>
											))}
										</ul>
									</li>
								))}
							</ul>
						): (
							"No items found"
						)}
					</div>
				</div>
			</section>
		</MainLayout>
	);
}
