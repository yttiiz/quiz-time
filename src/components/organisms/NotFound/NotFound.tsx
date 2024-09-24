import Link from "next/link";

export const NotFound = () => {
	return (
		<section className="not-found">
			<div className="container text-center">
				<p className="text-alert-default font-bold">
					404
				</p>
				<div className="grid gap-4">
					<h1>Oups</h1>
					<h2>Cette page n'existe pas !</h2>
					<Link
						href={"/"}
						children="Retour à l'accueil"
						className="underline font-medium hover:text-secondary-default duration-default"
					/>
				</div>
			</div>
		</section>
	);
};
