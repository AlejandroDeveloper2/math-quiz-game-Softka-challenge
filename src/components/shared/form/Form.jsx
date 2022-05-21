import { useState } from "react";

import Button from "../button/Button";
import Alert from "../alert/Alert";

import "./Form.css";

import ContinueIcon from "../../svgs/ContinueIcon";

const Form = (props) => {
  const { showQuizGameUI, playerConfig } = props;

  const [playerName, setPlayerName] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const validateForm = () => {
    if (playerName.trim() === "") {
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 2000);
      return;
    }
    playerConfig.setPlayerName(playerName);
    setPlayerName("");
    showQuizGameUI();
  };

  return (
    <div className="formContainer">
      <label htmlFor="player-name" className="label">
        Tu nombre de jugador
      </label>
      <input
        type="text"
        className="input"
        id="player-name"
        placeholder="Ingresa tu nombre!"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        maxLength={10}
      />
      <Button
        label="Continuar"
        icon={<ContinueIcon />}
        backgroundStyle="play"
        action={validateForm}
      />
      {isAlertVisible ? <Alert message="Ingresa tu nombre por favor!" /> : null}
    </div>
  );
};

export default Form;
