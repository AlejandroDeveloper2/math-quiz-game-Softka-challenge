import useModal from "../../../hooks/useModal";

import "./Quiz.css";

import Button from "../../shared/button/Button";
import Modal from "../../shared/modal/Modal";
import QuestionList from "../questionList/QuestionList";
import StaticticsPanel from "../staticticsPanel/StaticticsPanel";

import AppLogo from "../../../images/game-logo.png";
import ExitIcon from "../../svgs/ExitIcon";

const Quiz = (props) => {
  const {
    exitGame,
    questions,
    questionIndex,
    checkAnswerQuestion,
    statistics,
  } = props;

  const { isModalVisible, showModal, hideModal } = useModal();

  return (
    <div>
      <Modal isModalVisible={isModalVisible} hideModal={hideModal}>
        <div className="confirmContainer">
          <label className="text">
            ¿Estas seguro que quieres retirarte del quiz?
          </label>
          <Button
            label="Si, retirarme"
            icon={<ExitIcon />}
            backgroundStyle="play"
            action={exitGame}
          />
        </div>
      </Modal>
      <div className="container">
        <div className="quiz-container">
          <div className="header">
            <img src={AppLogo} alt="Game logo" className="app-logo" />
            <Button
              label="Retirarse"
              icon={<ExitIcon />}
              backgroundStyle="play"
              action={showModal}
            />
          </div>
          <QuestionList
            questions={questions}
            questionIndex={questionIndex}
            checkAnswerQuestion={checkAnswerQuestion}
          />
        </div>
        <StaticticsPanel statistics={statistics} />
      </div>
    </div>
  );
};

export default Quiz;
