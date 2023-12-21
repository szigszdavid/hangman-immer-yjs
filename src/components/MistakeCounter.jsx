export default function MistakeCounter({mistakes, maxMistakes}) {
    return (
        <p>Mistakes: {mistakes} / {maxMistakes}</p>
    )
}