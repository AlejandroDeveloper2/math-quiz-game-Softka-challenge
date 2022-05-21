import Question from "../question/Question";

import "./QuestionList.css";

const QuestionList = (props) => {
  const { questions, questionIndex, checkAnswerQuestion } = props;

  return (
    <div className="question-container">
      <Question
        question={questions[questionIndex]}
        questionCounter={questionIndex + 1}
        checkAnswerQuestion={checkAnswerQuestion}
      />
    </div>
  );
};

export default QuestionList;
