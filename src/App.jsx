import HangmanGame from "./HangmanGame";
import ImmerMultiplayerComponent from "./components/MultiplayerComponentFunctional";
import { initialGameState } from "./state/gameState";

const App = () => {
  
  return (
    <ImmerMultiplayerComponent initialGameState={initialGameState}>
      <HangmanGame />
    </ImmerMultiplayerComponent>
  );
};

export default App;
