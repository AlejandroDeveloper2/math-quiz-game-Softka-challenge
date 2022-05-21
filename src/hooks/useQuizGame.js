import { useState } from "react";
import * as firestore from "firebase/firestore";

import { database } from "../config/firebase";
import Player from "../helpers/player";

const useQuizGame = () => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [easyQuestions, setEasyQuestions] = useState([]);
  const [normalQuestions, setNormalQuestions] = useState([]);
  const [hardQuestions, setHardQuestions] = useState([]);
  const [harderQuestions, setHarderQuestions] = useState([]);
  const [insaneQuestions, setInsaneQuestions] = useState([]);

  const [coins, setCoins] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [matchs, setMatchs] = useState(0);
  const [playerName, setPlayerName] = useState("");

  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlayerWinner, setIsPlayerWinner] = useState(false);
  const [isPlayerBackingOut, setIsPlayerBackingOut] = useState(false);

  const [randomIndex, setRandomIndex] = useState(0);

  const [players, setPlayers] = useState([]);
  const [isRankingActive, setIsRankingActive] = useState(false);

  const activeGame = () => {
    setIsGameActive(true);
  };

  const resetGameQuiz = () => {
    setQuestionIndex(0);
    setCoins(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setMatchs(0);
    setIsPlayerWinner(false);
    setIsGameOver(false);
    setPlayerName("");
    setIsGameActive(false);
  };

  const exitGame = () => {
    resetGameQuiz();
    createPlayerObject();
    setIsGameActive(false);
  };

  const backingOutGame = () => {
    setIsPlayerBackingOut(true);
    setIsGameOver(true);
  };

  const chooseRandomQuestions = () => {
    let random = Math.round(Math.random() * 5);
    setRandomIndex(random);
  };

  const getQuestions = async () => {
    chooseRandomQuestions();
    const questionCollection = firestore.collection(database, "questions");
    const query = firestore.query(questionCollection);
    const querySnapshot = await firestore.getDocs(query);

    let easyQuestionsList = [];
    let normalQuestionsList = [];
    let hardQuestionsList = [];
    let harderQuestionsList = [];
    let insaneQuestionsList = [];

    querySnapshot.forEach((document) => {
      if (document.data().category === "easy") {
        easyQuestionsList.push(document.data());
      } else if (document.data().category === "normal") {
        normalQuestionsList.push(document.data());
      } else if (document.data().category === "hard") {
        hardQuestionsList.push(document.data());
      } else if (document.data().category === "harder") {
        harderQuestionsList.push(document.data());
      } else {
        insaneQuestionsList.push(document.data());
      }
    });

    setEasyQuestions(easyQuestionsList);
    setNormalQuestions(normalQuestionsList);
    setHardQuestions(hardQuestionsList);
    setHarderQuestions(harderQuestionsList);
    setInsaneQuestions(insaneQuestionsList);

    let questionsList = [
      easyQuestions[randomIndex],
      normalQuestions[randomIndex],
      hardQuestions[randomIndex],
      harderQuestions[randomIndex],
      insaneQuestions[randomIndex],
    ];

    setQuestions(questionsList);
  };

  const checkAnswerQuestion = (answer, correctAnswer, question) => {
    if (answer === correctAnswer) {
      if (question.category === "easy") {
        setCoins((prevCoins) => prevCoins + 10);
      } else if (question.category === "normal") {
        setCoins((prevCoins) => prevCoins + 15);
      } else if (question.category === "hard") {
        setCoins((prevCoins) => prevCoins + 20);
      } else if (question.category === "harder") {
        setCoins((prevCoins) => prevCoins + 25);
      } else {
        setCoins((prevCoins) => prevCoins + 30);
      }
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setWrongAnswers((prevWrongAnswers) => prevWrongAnswers + 1);
      setCoins(0);
      setMatchs((prevMatchs) => prevMatchs + 1);
      setIsPlayerBackingOut(false);
      setIsGameOver(true);
      createPlayerObject();
    }
  };

  const checkGameQuiz = () => {
    if (coins === 100) {
      setIsPlayerWinner(true);
      setIsGameOver(true);
      setMatchs((prevMatchs) => prevMatchs + 1);
      createPlayerObject();
    }
  };

  const createPlayerObject = () => {
    const player = new Player();
    player.setName(playerName);
    player.setEarnedCoins(coins);
    player.setCorrectAnswers(correctAnswers);
    player.setWrongAnswers(wrongAnswers);
    player.setMaxMatch(matchs);

    //save info player to database
    player.checkIfPlayerExists(coins, correctAnswers, wrongAnswers, matchs);
  };

  const getAllPlayers = async () => {
    let playerList = [];
    const playerCollection = firestore.collection(database, "players");
    const query = firestore.query(
      playerCollection,
      firestore.orderBy("earnedCoins", "desc")
    );
    const querySnapshot = await firestore.getDocs(query);

    querySnapshot.docs.forEach((document) => {
      playerList.push(document.data());
    });

    setPlayers(playerList);
  };

  const seeRanking = () => {
    setIsRankingActive(true);
  };

  const closeRankings = () => {
    setIsRankingActive(false);
  };

  return {
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
    isPlayerBackingOut,
    activeGame,
    exitGame,
    getQuestions,
    checkAnswerQuestion,
    checkGameQuiz,
    setPlayerName,
    getAllPlayers,
    seeRanking,
    closeRankings,
    backingOutGame,
  };
};
export default useQuizGame;
