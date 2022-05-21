import AnswerOption from "../answerOption/AnswerOption";

import "./Question.css";

const Question = (props) => {
  const { question, questionCounter, checkAnswerQuestion } = props;

  return (
    <div className="container-question">
      <div className="question">
        <div className="question-indicator">
          <label className="text-sentence">{questionCounter}</label>
        </div>
        <label className="text-sentence">{question?.sentence}</label>
        <label className="text-exercise">{question?.exercise}</label>
      </div>
      <div className="answer-list">
        {question?.answers.map((answer, index) => (
          <AnswerOption
            key={index}
            answer={answer}
            checkAnswerQuestion={checkAnswerQuestion}
            correctAnswer={question?.correctAnswer}
            question={question}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
