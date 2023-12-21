export default function Result({ result }) {
  return (
    <>
      <p style={{ color: result == "You won!" ? "green" : "red"}}>{result}</p>
    </>
  );
}
