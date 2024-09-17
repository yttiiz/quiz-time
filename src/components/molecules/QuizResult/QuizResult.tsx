export const QuizResult = ({ points, length }: { points: number; length: number }) => {
  return (
    <div>
      <h3>Résultat final</h3>
      <div>Vous avez fait un score de {points} sur {length}.</div>
    </div>
  );
};