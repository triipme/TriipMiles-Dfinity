import React from "react";
import { Link } from "react-router-dom";

function Minigame() {
  return (
    <>
      {/* MiniGame */}
      <div className="miniGameBoard">
        <img
          src="./images/static/SUSTAINATIONS/background_minigame_right.png"
          alt="bgMinigameRight"
          className="bgMinigameRight"
        />
        <img
          src="./images/static/SUSTAINATIONS/background_minigame_left.png"
          alt="bgMinigameLeft"
          className="bgMinigameLeft"
        />
        <img
          className="giftMinigameRight"
          src="./images/static/SUSTAINATIONS/gift_minigame.png"
          alt="giftMinigame"
        />
        <img
          className="giftMinigameLeft"
          src="./images/static/SUSTAINATIONS/gift_minigame1.png"
          alt="giftMinigame"
        />
        <p className="minigameHeader">
          <b>Play Minigames</b>
        </p>
        <div className="listMiniGame">
          <div className="itemMinigame">
            <div>
              <img src="./images/static/SUSTAINATIONS/memory.png" alt="MemoryCard" />
            </div>
            <div>
              <p>
                <b>Memory Game</b>
              </p>
              <Link to="/game">Play now >> </Link>
            </div>
          </div>
          <div className="itemMinigame">
            <div>
              <img src="./images/static/SUSTAINATIONS/luckywheel.png" alt="LuckyWheel" />
            </div>
            <div>
              <p>
                <b>Lucky Wheel</b>
              </p>
              <a href="#">Play now >></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Minigame;
