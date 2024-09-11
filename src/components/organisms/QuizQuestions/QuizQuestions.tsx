import { QuizItems } from "@/components/mod";
import { QuestionType } from "@/services/mod";

export const QuizQuestions = ({ list }: { list: QuestionType[] } ) => {
  return (
    <ul>
    {list.map(({ question }, index) => (
      <li key={index + ((Math.random() + 1) * 1000)}>
        <h2>{question.title}</h2>
        <QuizItems questions={question.propositions} />
      </li>
    ))}
  </ul>
  );
};