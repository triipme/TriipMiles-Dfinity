import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Game from "../../Game";

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
        <p className="minigameHeader">Play Minigames</p>
        <div className="listMiniGame">
          <div className="itemMinigame">
            <div>
              <img src="./images/static/SUSTAINATIONS/memory.png" alt="MemoryCard" />
            </div>
            <div>
              <p>Memory Game</p>
              <Link to="/game">Play now >> </Link>
            </div>
          </div>
          <div className="itemMinigame">
            <div>
              <img src="./images/static/SUSTAINATIONS/luckywheel.png" alt="LuckyWheel" />
            </div>
            <div>
              <p>Lucky Wheel</p>
              <a href="#">Play now >></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Minigame;
