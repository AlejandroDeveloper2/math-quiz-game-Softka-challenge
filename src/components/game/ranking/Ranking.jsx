import Button from "../../shared/button/Button";

import "./Ranking.css";

import ExitIcon from "../../svgs/ExitIcon";

const Ranking = (props) => {
  const { players, closeRankings } = props;

  return (
    <div className="rank-container">
      {players.length === 0 ? (
        <span className="title"> No hay jugadores! </span>
      ) : (
        players?.map((player, index) => (
          <div key={player.name} className="row">
            <span className="player-position"> {index + 1} </span>
            <label className="text"> {player.name} </label>
            <label className="text"> {player.earnedCoins} </label>
            <label className="text"> {player.correctAnswers} </label>
            <label className="text"> {player.wrongAnswers} </label>
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
