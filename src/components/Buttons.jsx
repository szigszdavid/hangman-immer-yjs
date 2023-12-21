export default function Buttons({ guesses, letterButtonOnClick, mistakes }) {
  const letters =
    "a,á,b,c,d,e,é,f,g,h,i,í,j,k,l,m,n,o,ó,ö,ő,p,q,r,s,t,u,ú,ü,ű,v,w,x,y,z";

  return (
    <>
      {letters.split(",").map((letter) => (
        <button key={letter} onClick={() => letterButtonOnClick(letter)} disabled={guesses.includes(letter) || mistakes === 9 }>
          {letter}
        </button>
      ))}
    </>
  );
}
