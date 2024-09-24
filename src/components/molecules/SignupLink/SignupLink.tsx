import Link from "next/dist/client/link";

export const SignupLink = () => {
	return (
		<div className="grid gap-4 justify-center p-10">
			<h3 className="text-secondary-default">Pas encore inscrit ?</h3>
			<Link
				href={"/signup"}
				children="Créer votre compte"
				className="text-center font-bold hover:text-secondary-default underline hover:underline duration-default"
			/>
		</div>
	);
};
