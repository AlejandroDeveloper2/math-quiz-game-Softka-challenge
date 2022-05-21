import "./AnswerOption.css";

const AnswerOption = (props) => {
  const { answer, checkAnswerQuestion, correctAnswer, question } = props;

  return (
    <button
      className="answer-container answer-text"
      onClick={() => checkAnswerQuestion(answer, correctAnswer, question)}
    >
      {answer}
    </button>
  );
};

export default AnswerOption;
