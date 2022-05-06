import React, { useState, useEffect } from "react";
import "./Play.mc.sass";
import SingleCard from "../components/SingleCard";
import { ButtonPrimary } from "../../../components";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

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
  console.log(cards);
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
    (async () => {
      try {
        if (!!actor?.getLevel) {
          const level = await actor.getLevel(state?.lv_id);
          if ("ok" in level) {
            shuffleCards(
              level.ok.volcabulary.map(v => ({ word: v[0], result: v[1], matched: false }))
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!!!state?.lv_id) {
    return <Navigate to="/game/magic_memory" />;
  }

  return (
    <div className="App">
      <Typography variant="h1">Magic Memory Game</Typography>
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

      <p>Turns: {turns}</p>
    </div>
  );
}

export default Play;
