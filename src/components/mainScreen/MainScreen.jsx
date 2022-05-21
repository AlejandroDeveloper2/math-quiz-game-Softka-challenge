import { useEffect } from "react";

import useModal from "../../hooks/useModal";
import useQuizGame from "../../hooks/useQuizGame";

import Button from "../shared/button/Button";
import Modal from "../shared/modal/Modal";
import Form from "../shared/form/Form";
import Quiz from "../game/quiz/Quiz";
import Ranking from "../game/ranking/Ranking";

import "./MainScreen.css";

import AppLogo from "../../images/game-logo.png";
import PlayIcon from "../svgs/PlayIcon";
import RankIcon from "../svgs/RankIcon";
import CoinIcon from "../svgs/CoinIcon";
import MatchIcon from "../svgs/MatchIcon";
import CorrectAnswerIcon from "../svgs/CorrectAnswerIcon";
import WrongAnswerIcon from "../svgs/WrongAnswerIcon";
import ExitIcon from "../svgs/ExitIcon";

const MainScreen = () => {
  const { isModalVisible, showModal, hideModal } = useModal();
  const {
    isGameActive,
    questions,
    questionIndex,
    coins,
    wrongAnswers,
    correctAnswers,
    matchs,
    isGameOver,
    isPlayerWinner,
    playerName,
    players,
    isRankingActive,
    getQuestions,
    checkAnswerQuestion,
    checkGameQuiz,
    activeGame,
    exitGame,
    setPlayerName,
    getAllPlayers,
    seeRanking,
    closeRankings,
  } = useQuizGame();

  const showQuizGameUI = () => {
    hideModal();
    activeGame();
  };

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line
  }, [isGameActive]);

  useEffect(() => {
    checkGameQuiz();
    // eslint-disable-next-line
  }, [coins, isGameOver]);

  useEffect(() => {
    getAllPlayers();
    // eslint-disable-next-line
  }, [isRankingActive]);

  const statistics = {
    coins,
    wrongAnswers,
    correctAnswers,
    matchs,
  };

  const playerConfig = {
    setPlayerName,
  };

  return (
    <div>
      <Modal isModalVisible={isModalVisible} hideModal={hideModal}>
        <Form showQuizGameUI={showQuizGameUI} playerConfig={playerConfig} />
      </Modal>
      <div className="start-game-panel">
        {!isGameActive && !isRankingActive ? (
          <>
            <img src={AppLogo} alt="Game logo" className="app-logo" />
            <div className="button-container">
              <Button
                label="Jugar"
                icon={<PlayIcon />}
                backgroundStyle="play"
                action={showModal}
              />
              <Button
                label="Ranking"
                icon={<RankIcon />}
                backgroundStyle="rank"
                action={seeRanking}
              />
            </div>
          </>
        ) : isGameOver ? (
          <>
            <img src={AppLogo} alt="Game logo" className="app-logo" />
            <div className="result-panel">
              <div className="row">
                {isPlayerWinner ? (
                  <label className="status-text green"> Ganaste! </label>
                ) : (
                  <label className="status-text red"> Oh no! perdiste! </label>
                )}
              </div>
              <div className="row">
                <PlayIcon />
                <label className="title">Jugador:</label>
                {playerName}
              </div>
              <div className="row">
                <CoinIcon />
                <label className="title">Monedas ganadas:</label>
                {coins}
              </div>
              <div className="row">
                <CorrectAnswerIcon />
                <label className="title">Respuestas acertadas:</label>
                {correctAnswers}
              </div>
              <div className="row">
                <WrongAnswerIcon />
                <label className="title">Respuestas erroneas:</label>
                {wrongAnswers}
              </div>
              <div className="row">
                <MatchIcon />
                <label className="title">Partida jugada:</label>
                {matchs}
              </div>
              <Button
                label="Salir"
                icon={<ExitIcon />}
                backgroundStyle="rank"
                action={exitGame}
              />
            </div>
          </>
        ) : isRankingActive && !isGameActive ? (
          <>
            <img src={AppLogo} alt="Game logo" className="app-logo" />
            <Ranking players={players} closeRankings={closeRankings} />
          </>
        ) : (
          <Quiz
            exitGame={exitGame}
            questions={questions}
            questionIndex={questionIndex}
            checkAnswerQuestion={checkAnswerQuestion}
            statistics={statistics}
          />
        )}
      </div>
    </div>
  );
};

export default MainScreen;
