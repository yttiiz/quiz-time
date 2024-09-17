export const QuizResult = ({ points, length }: { points: number; length: number }) => {
  points = +((points / length) * 20).toFixed();

	const congrats = (note: number) => {
		if (note >= 16) return "Félicitations";
		if (note >= 12 && note < 16) return "C'est très bien";
		if (note >= 10 && note < 10) return "C'est assez bien";
		if (note >= 8 && note < 10) return "C'est moyen";
		return "C'est à revoir";
	};

	return (
		<div className="grid gap-4">
			<h3>Résultat final</h3>
			<div>
				Vous avez obtenu la note de{" "}
				<b className="text-alert-default">{points} sur 20</b>.{" "}
				{congrats(points)} !
			</div>
		</div>
	);
};