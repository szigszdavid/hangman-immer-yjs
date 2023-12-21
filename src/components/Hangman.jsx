export default function Hangman({mistakes}) {
    return (
        <svg id="hangmanSVG" width="100px" height="100px">
          <line x1="0" y1="99%" x2="100%" y2="99%" stroke="black" style={{ display: 0 < mistakes ? "block" : "none" }} />
          <line x1="20%" y1="99%" x2="20%" y2="5%" stroke="black" style={{ display: 1 < mistakes ? "block" : "none" }} />
          <line x1="20%" y1="5%" x2="60%" y2="5%" stroke="black" style={{ display: 2 < mistakes ? "block" : "none" }} />
          <line x1="60%" y1="5%" x2="60%" y2="20%" stroke="black" style={{ display: 3 < mistakes ? "block" : "none" }} />
          <circle cx="60%" cy="30%" r="10%" stroke="black" style={{ display: 4 < mistakes ? "block" : "none" }} />
          <line x1="60%" y1="30%" x2="60%" y2="70%" stroke="black" style={{ display: 5 < mistakes ? "block" : "none" }} />
          <line x1="40%" y1="50%" x2="80%" y2="50%" stroke="black" style={{ display: 6 < mistakes ? "block" : "none" }} />
          <line x1="60%" y1="70%" x2="50%" y2="90%" stroke="black" style={{ display: 7 < mistakes ? "block" : "none" }} />
          <line x1="60%" y1="70%" x2="70%" y2="90%" stroke="black" style={{ display: 8 < mistakes ? "block" : "none" }} />
        </svg>
    )
}