import Button from "../../shared/button/Button";

import "./Ranking.css";

import ExitIcon from "../../svgs/ExitIcon";
import CoinIcon from "../../svgs/CoinIcon";
import MatchIcon from "../../svgs/MatchIcon";
import CorrectAnswerIcon from "../../svgs/CorrectAnswerIcon";
import WrongAnswerIcon from "../../svgs/WrongAnswerIcon";

const Ranking = (props) => {
  const { players, closeRankings } = props;

  return (
    <div className="rank-container">
      <label className="title-rank">Ranking de jugadores</label>
      {players.length === 0 ? (
        <span className="title-rank"> No hay jugadores! </span>
      ) : (
        players?.map((player, index) => (
          <div key={player.name} className="row-ranking">
            <span className="player-position"> {index + 1} </span>
            <label className="text"> {player.name} </label>
            <CoinIcon />
            <label className="text"> {player.earnedCoins} </label>
            <CorrectAnswerIcon />
            <label className="text"> {player.correctAnswers} </label>
            <WrongAnswerIcon />
            <label className="text"> {player.wrongAnswers} </label>
            <MatchIcon />
            <label className="text"> {player.maxMatch} </label>
          </div>
        ))
      )}
      <Button
        label="Volver"
        icon={<ExitIcon />}
        backgroundStyle="rank"
        action={closeRankings}
      />
    </div>
  );
};

export default Ranking;
