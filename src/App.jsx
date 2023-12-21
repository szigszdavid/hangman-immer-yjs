import HangmanGame from "./HangmanGame";
import ImmerMultiplayerComponent from "./components/ImmerMultiplayerComponent";
import { initialGameState } from "./state/gameState";
import { initalRoundsState } from "./state/rounds";

const App = () => {
  
  return (
    <ImmerMultiplayerComponent initialGameState={initialGameState} initialRoundsState={initalRoundsState}>
      <HangmanGame />
    </ImmerMultiplayerComponent>
  );
};

export default App;
