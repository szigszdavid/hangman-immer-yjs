import "./Word.css"

export default function Word({ word, guesses }) {
    return(
        <>
        {
            word.split("").map((letter, index) => <span key={index}>{guesses.includes(letter) ? letter : "_"}</span>)
        }
        </>
    )
}