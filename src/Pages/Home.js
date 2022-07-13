import { useEffect, useState } from "react";
import Card from "../Components/Card";

const initialCards = [
     { "src": "/images/bulbasaur.png", matched: false },
     { "src": "/images/butterfree.png", matched: false },
     { "src": "/images/charmander.png", matched: false },
     { "src": "/images/pidgeotto.png", matched: false },
     { "src": "/images/pikachu.png", matched: false },
     { "src": "/images/squirtle.png", matched: false },
];

const Home = () => {
     const [cards, setCards] = useState([]);
     const [turn, setTurn] = useState(0);
     const [choiceOne, setChoiceOne] = useState(null)
     const [choiceTwo, setChoiceTwo] = useState(null)
     const [disabled, setDisabled] = useState(true);
     const [startFlip, setStartFlip] = useState(true);

     useEffect(() => {
          setTimeout(() => {
               setStartFlip(false)
          }, 1000);
          shuffleCards();
     }, []);

     const shuffleCards = () => {
          const shuffledCards = [...initialCards, ...initialCards].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));

          setChoiceOne(null)
          setChoiceTwo(null)
          setCards(shuffledCards);
          setTurn(0);
          setDisabled(false)
          setStartFlip(true)
          setTimeout(() => {
               setStartFlip(false)
          }, 1000);
     }

     const handleChoice = (card) => {
          choiceOne ? (
               choiceOne.id !== card.id && setChoiceTwo(card)
          ) : setChoiceOne(card)
     }

     const resetTurn = () => {
          setChoiceOne(null)
          setChoiceTwo(null)
          setTurn(prevTurn => prevTurn + 1)
          setDisabled(false)
     }

     useEffect(() => {
          if (choiceOne && choiceTwo) {
               setDisabled(true);
               if (choiceOne.src === choiceTwo.src) {
                    setCards(prevCards => {
                         return prevCards.map(card => {
                              if (card.src === choiceOne.src) {
                                   return { ...card, matched: true }
                              } else {
                                   return card
                              }
                         })
                    })
                    resetTurn();
               } else {
                    setTimeout(() => {
                         resetTurn();
                    }, 1000);
               }
          }
     }, [choiceOne, choiceTwo]);

     return (
          <div className="container">
               <button className="new-game-btn" onClick={shuffleCards}>Start New Game</button>

               <div className="grid">
                    {cards.map(card => (
                         <Card
                              key={card.id}
                              card={card}
                              handleChoice={handleChoice}
                              flipped={card === choiceOne || card === choiceTwo || card.matched || startFlip}
                              disabled={disabled}
                              matched={card.matched}
                         />
                    ))}
               </div>
               <p className="turns">Turns: {turn}</p>

               <footer>©2022, All Rights Reserved, Developed By <a href="https://iftakher-hossen.vercel.app/">Iftakher Hossen</a></footer>
          </div>
     );
};

export default Home;