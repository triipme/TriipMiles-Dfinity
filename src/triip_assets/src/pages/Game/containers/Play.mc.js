import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import "./Play.mc.sass";
import SingleCard from "../components/SingleCard";
import { ButtonPrimary, Loading } from "../../../components";
import { Box, Modal, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function Play() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const { actor } = useSelector(state => state.user);
  const { state } = useLocation();
  //shuffle
  const shuffleCards = cards => {
    const shuffledCards = [...cards, ...cards?.map(({ result, ...card }) => ({ ...card }))]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  //handle choice
  const handleChoice = card => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.word === choiceTwo.word) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.word === choiceOne.word) {
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
    apiShuffleCards();
  }, []);

  async function apiShuffleCards() {
    try {
      if (!!actor?.gameGcGetLevel) {
        const level = await actor.gameGcGetLevel(state?.lv_id);
        if ("ok" in level) {
          shuffleCards(
            level.ok.volcabulary.map(v => ({ word: v[0], result: v[1], matched: false }))
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!!!state?.lv_id) {
    return <Navigate to="/game/magic_memory" />;
  }
  const ref = useRef(null);
  return (
    <div className="App">
      <Typography variant="h1">Magic Memory Game</Typography>
      {cards?.length > 0 && (
        <TimingPlay
          ref={ref}
          turns={turns}
          cards={cards}
          level={state?.lv_id}
          player_id={state?.player_id}
        />
      )}
      <ButtonPrimary
        onClick={() => {
          apiShuffleCards();
          ref.current.resetTime();
        }}
        title="New Game"
        sx={{ width: 150 }}
      />
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

      <p>Turns: {turns}</p>
    </div>
  );
}

const TimingPlay = forwardRef(({ turns, cards, level, player_id }, ref) => {
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
      const rs = await actor?.gameGcSetPlayer({
        player_id: !!player_id ? [player_id] : [],
        turn: turns,
        timing_play: parseFloat((time / 100).toFixed(2)),
        level
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
        if (!!actor?.gameGcSetPlayer) {
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

export default Play;
