import React, { useState, useEffect } from "react";
import "./Level.sass";
import SingleCard from "../components/SingleCard";
import { ButtonPrimary } from "../../../components";
import { Box, Typography } from "@mui/material";

const cardImg = [
  { word: "М'ясо (m'yaso)", result: "Meat", matched: false },
  { word: "Хліб (khlib)", result: "Bread", matched: false },
  { word: "Мед (mud)", result: "Honey", matched: false },
  { word: "Морозиво (morozivo)", result: "Ice cream", matched: false },
  { word: "Салат (salat)", result: "Salad", matched: false },
  { word: "Сендвіч (sendvich)", result: "Sandwich", matched: false },
  { word: "Риба (ryba)", result: "Fish", matched: false },
  { word: "Овочі (ovuchi)", result: "Vegetables", matched: false }
];

function Level() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle
  const shuffleCards = () => {
    const shuffledCards = [
      ...cardImg,
      ...cardImg.map(card => ({ result: card.result, matched: false }))
    ]
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
      if (choiceOne.result === choiceTwo.result) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.result === choiceOne.result) {
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

  console.log(cards);

  return (
    <div className="App">
      <Typography variant="h1">Magic Memory Game</Typography>
      <ButtonPrimary onClick={shuffleCards} title="New Game" sx={{ width: 150 }} />
      <div className="card-grid">
        {cards.map(card => (
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

export default Level;
