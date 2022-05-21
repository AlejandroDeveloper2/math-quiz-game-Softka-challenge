import * as firestore from "firebase/firestore";
import { where } from "firebase/firestore";

import { database } from "../config/firebase";

class Player {
  constructor() {
    this.idPlayer = "";
    this.name = "";
    this.earnedCoins = 0;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.maxMatch = 0;
  }
  //Getters and setters
  getIdPlayer() {
    return this.idPlayer;
  }
  setIdPlayer(idPlayer) {
    this.idPlayer = idPlayer;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
  getEarnedCoins() {
    return this.earnedCoins;
  }
  setEarnedCoins(earnedCoins) {
    this.earnedCoins = earnedCoins;
  }
  getCorrectAnswers() {
    return this.correctAnswers;
  }
  setCorrectAnswers(correctAnswers) {
    this.correctAnswers = correctAnswers;
  }

  getWrongAnswers() {
    return this.wrongAnswers;
  }
  setWrongAnswers(wrongAnswers) {
    this.wrongAnswers = wrongAnswers;
  }
  getMaxMatch() {
    return this.maxMatch;
  }
  setMaxMatch(maxMatch) {
    this.maxMatch = maxMatch;
  }

  //methods
  generateRandomPlayerId() {
    let id = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 10; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  }

  async saveNewPlayerData() {
    const randomId = this.generateRandomPlayerId();
    const playerDocument = firestore.doc(database, "players", randomId);

    firestore.setDoc(
      playerDocument,
      {
        name: this.getName(),
        earnedCoins: this.getEarnedCoins(),
        correctAnswers: this.getCorrectAnswers(),
        wrongAnswers: this.getWrongAnswers(),
        maxMatch: this.getMaxMatch(),
      },
      {
        merge: true,
      }
    );
  }

  async checkIfPlayerExists(coins, correctAnswers, wrongAnswers, matchs) {
    const playerCollection = firestore.collection(database, "players");
    const query = firestore.query(
      playerCollection,
      where("name", "==", this.getName())
    );

    const querySnapshot = await firestore.getDocs(query);
    if (querySnapshot.empty) {
      this.saveNewPlayerData();
    } else {
      querySnapshot.docs.forEach((document) => {
        if (document.exists() === false) {
          this.saveNewPlayerData();
        } else {
          this.setIdPlayer(document.id);
          this.setCorrectAnswers(document.data().correctAnswers);
          this.setWrongAnswers(document.data().wrongAnswers);
          this.setEarnedCoins(document.data().earnedCoins);
          this.setMaxMatch(document.data().maxMatch);

          this.updatePlayerData(coins, correctAnswers, wrongAnswers, matchs);
        }
      });
    }
  }

  updatePlayerData(coins, correctAnswers, wrongAnswers, matchs) {
    console.log(this.getIdPlayer());
    const playerDocument = firestore.doc(
      database,
      "players",
      this.getIdPlayer()
    );
    firestore.setDoc(
      playerDocument,
      {
        name: this.getName(),
        earnedCoins: coins + this.getEarnedCoins(),
        correctAnswers: correctAnswers + this.getCorrectAnswers(),
        wrongAnswers: wrongAnswers + this.getWrongAnswers(),
        maxMatch: matchs + this.getMaxMatch(),
      },
      {
        merge: true,
      }
    );
  }
}
export default Player;
