export const QuizGames = ({ content }: { content: string }) => {
  return (
    <section id="quiz-games">
      <div className="container">
        <h1>{content}</h1>
      </div>
    </section>
  );
};