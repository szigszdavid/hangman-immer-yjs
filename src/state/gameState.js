export const answers = ["alma", "szilva", "körte"];
export const initialGameState = {
  word: answers[Math.floor(Math.random() * answers.length)],
  guesses: [],
  mistakes: 0,
  result: "",
  maxMistakes: 9,
};
