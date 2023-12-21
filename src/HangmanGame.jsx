import Word from "./components/Word";
import Buttons from "./components/Buttons";
import Result from "./components/Result";
import Hangman from "./components/Hangman";
import MistakeCounter from "./components/MistakeCounter";
import { useCallback } from "react";
import { useGameImmerYjs } from "./state/game";
import { answers } from "./state/gameState";
import { isCurrentPlayer, nextPlayer } from "./state/rounds";

export default function HangmanGame() {
  const [game, setGame] = useGameImmerYjs();

  const handleNewGameClick = useCallback(() => {
    newGame();
  }, []);

  const handleLetterButtonOnClick = useCallback((e) => {
    if (isCurrentPlayer()) {
      guess(e);

      nextPlayer()
    }
  }, []);

  const guess = useCallback((letter) => {
    setGame((draft) => {
      draft.guesses.push(letter);

      if (!draft.word.includes(letter)) {
        draft.mistakes++;

        if (draft.mistakes === draft.maxMistakes) {
          draft.result = "You lost!";
        }
      } else {
        if (
          draft.word
            .split("")
            .every((wordElement) => draft.guesses.includes(wordElement))
        ) {
          draft.result = "You won!";
        }
      }
    });
  }, []);

  const newGame = useCallback(() => {
    setGame((draft) => {
      Object.assign(draft, {
        word: answers[Math.floor(Math.random() * answers.length)],
        guesses: [],
        mistakes: 0,
        result: "",
        maxMistakes: 9,
      });
    });
  }, []);

  return (
    <>
      <h1>Hangman</h1>
      { JSON.stringify(game) }
      <Result result={game.result} />
      <Word word={game.word} guesses={game.guesses} />
      <br />
      <button onClick={handleNewGameClick}>New game</button>
      <br />
      <Buttons
        letterButtonOnClick={handleLetterButtonOnClick}
        guesses={game.guesses}
        mistakes={game.mistakes}
      />

      <MistakeCounter mistakes={game.mistakes} maxMistakes={game.maxMistakes} />

      <Hangman mistakes={game.mistakes} />
    </>
  );
}
