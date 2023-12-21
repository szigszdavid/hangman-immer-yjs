import { configuration, deleteClient } from "../state/configuration"
import { deletePlayer } from "../state/rounds"

export default function QuitButton({ quitGame }) {

    return(
        <>
            <button id='quitButton' onClick={quitGame}>Quit</button>
        </>
    )
}