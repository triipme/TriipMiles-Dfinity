import { useTheme } from "@mui/system";
import React from "react";
import "./SingleCard.sass";

function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  const theme = useTheme();
  return (
    <div className="card" style={{ border: `2px solid ${theme.palette.primary.main}` }}>
      <div className={flipped ? "flipped" : "default"} style={{ justifyContent: "center" }}>
        <p className="front" style={{ fontSize: 18 }}>
          {card?.result ?? card?.word}
        </p>
        <img className="back" src="/img/cover.png" onClick={handleClick} alt="cover" />
      </div>
    </div>
  );
}

export default SingleCard;
