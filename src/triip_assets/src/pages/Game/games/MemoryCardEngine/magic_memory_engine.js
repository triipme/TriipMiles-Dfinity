import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import "./magic_memory_engine.sass";
import SingleCard from "@/pages/Game/components/SingleCard";
import { ButtonPrimary, Loading } from "@/components";
import { Box, Modal, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const cardImg = [
  { src: "/img/sticker1.webp", matched: false },
  { src: "/img/sticker2.webp", matched: false },
  { src: "/img/sticker3.webp", matched: false },
  { src: "/img/sticker4.webp", matched: false },
  { src: "/img/sticker5.webp", matched: false },
  { src: "/img/sticker6.webp", matched: false }
];

function MagicMemoryEngine() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const ref = useRef(null);
  const { state } = useLocation();
  //shuffle
  const shuffleCards = () => {
    const shuffledCards = [...cardImg, ...cardImg]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    ref.current?.resetTime();
  };

  //handle choice
  const handleChoice = card => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset choice
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  //start new game
  useEffect(() => {
    shuffleCards();
  }, []);
  if (!!state?.player_id) {
    return <Navigate to="/game/magic_memory" />;
  }
  return (
    <div className="App">
      <Typography variant="h1">Magic Memory Game</Typography>
      <p>Turns: {turns}</p>
      {cards?.length > 0 && <TimingPlay ref={ref} turns={turns} cards={cards} />}
      <ButtonPrimary onClick={shuffleCards} title="New Game" sx={{ width: 150 }} />
      <div className="card-grid">
        {cards?.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

const TimingPlay = forwardRef(({ turns, cards }, ref) => {
  const { actor } = useSelector(state => state.user);
  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const to = setTimeout(() => {
      !isLoading && setTime(prevTime => prevTime + 1);
    }, 10);
    return () => clearTimeout(to);
  }, [time, isLoading]);
  async function apiSetPlayer() {
    try {
      const rs = await actor?.gameGcEngineSetPlayer({
        turn: turns,
        timing_play: parseFloat((time / 100).toFixed(2))
      });
      if ("ok" in rs) {
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useImperativeHandle(ref, () => ({
    resetTime() {
      resetTime();
    }
  }));
  function resetTime() {
    setTime(0);
  }
  useEffect(() => {
    if (cards.length > 0) {
      if (cards.every(card => card.matched)) {
        // submit to Server
        setIsLoading(true);
        if (!!actor?.gameGcEngineSetPlayer) {
          apiSetPlayer();
        }
      }
    }
    if (turns === 0) {
      setTime(0);
    }
  }, [turns]);
  return (
    <div>
      <Modal open={isLoading}>
        <Loading />
      </Modal>
      <p>Time: {(time / 100).toFixed(2)}</p>
    </div>
  );
});

export default MagicMemoryEngine;
