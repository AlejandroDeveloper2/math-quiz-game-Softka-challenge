import "./StaticticsPanel.css";

import CoinIcon from "../../svgs/CoinIcon";
import MatchIcon from "../../svgs/MatchIcon";
import CorrectAnswerIcon from "../../svgs/CorrectAnswerIcon";
import WrongAnswerIcon from "../../svgs/WrongAnswerIcon";

const StaticticsPanel = (props) => {
  const { statistics } = props;
  const { coins, wrongAnswers, correctAnswers, matchs } = statistics;

  const items = [
    { icon: <CoinIcon />, value: coins },
    { icon: <MatchIcon />, value: matchs },
    { icon: <CorrectAnswerIcon />, value: correctAnswers },
    { icon: <WrongAnswerIcon />, value: wrongAnswers },
  ];

  return (
    <div className="statictics-panel">
      {items.map((item, index) => (
        <div key={index} className="statistic">
          {item.icon}
          {item.value}
        </div>
      ))}
    </div>
  );
};

export default StaticticsPanel;
