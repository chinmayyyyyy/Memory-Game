import { useEffect, useState } from "react";
import Card from "./components/Card";
import { shuffle } from "./utils/shuffle";

const symbols = ['🐶', '🐱', '🐵', '🐸', '🦄', '🐼', '🐯', '🐷'];

const App = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [tries, setTries] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(
    localStorage.getItem("bestScore") ? parseFloat(localStorage.getItem("bestScore")) : 0
  );
  const [difficulty, setDifficulty] = useState("easy");
  const [hasFlippedFirstCard, setHasFlippedFirstCard] = useState(false);

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  useEffect(() => {
    let interval = null;
    if (isGameActive && hasFlippedFirstCard && matched.length !== cards.length / 2) {
      interval = setInterval(() => {
        setTimer(prev => prev + 0.01);
      }, 10);
    }
    if (matched.length === cards.length / 2 && isGameActive) {
      setIsGameActive(false);
      const currentScore = timer / tries;
      if (!score || currentScore < score) {
        setScore(currentScore);
        localStorage.setItem("bestScore", currentScore);
      }
    }
    return () => clearInterval(interval);
  }, [matched, isGameActive, hasFlippedFirstCard, timer, tries]);

  const getGridSize = () => {
    switch (difficulty) {
      case "easy": return 2;
      case "medium": return 4;
      case "hard": return 6;
      default: return 2;
    }
  };

  const resetGame = () => {
    const gridSize = getGridSize();
    const totalPairs = (gridSize * gridSize) / 2;
    const newSymbols = shuffle([
      ...symbols.slice(0, totalPairs),
      ...symbols.slice(0, totalPairs),
    ]);
    setCards(newSymbols.map((symbol, i) => ({ id: i, symbol })));
    setFlipped([]);
    setMatched([]);
    setTries(0);
    setTimer(0);
    setIsGameActive(true);
    setHasFlippedFirstCard(false);
  };

  const handleFlip = (index) => {
    if (!hasFlippedFirstCard) setHasFlippedFirstCard(true);
    if (flipped.length === 2 || flipped.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const isMatch = cards[first].symbol === cards[second].symbol;
      setTimeout(() => {
        if (isMatch) {
          setMatched(prev => [...prev, cards[first].symbol]);
        }
        setFlipped([]);
        setTries(prev => prev + 1);
      }, 700);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white bg-[url('/pattern.svg')] bg-repeat flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4 tracking-wide">🧠 Memory Match Game</h1>

      <div className="mb-4">
        <label htmlFor="difficulty" className="mr-2 text-lg">Choose Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
        >
          <option value="easy">Easy (2x2)</option>
          <option value="medium">Medium (4x4)</option>
          <option value="hard">Hard (6x6)</option>
        </select>
      </div>

      <div className="mb-4 text-center space-y-2">
        <button
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg shadow-md"
          onClick={resetGame}
        >
          Restart 🔄
        </button>
        <div className="text-lg">Tries: {tries}</div>
        <div className="text-lg">Time: {timer.toFixed(2)}s</div>
        {matched.length === cards.length / 2 && (
          <div className="text-lg font-semibold text-green-400">
            Score: {(timer / tries).toFixed(2)}s
          </div>
        )}
        {score > 0 && (
          <div className="text-lg text-yellow-400">Best Score: {score.toFixed(2)}s</div>
        )}
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${getGridSize()}, minmax(80px, 100px))`,
        }}
      >
        {cards.map((card, idx) => (
          <Card
            key={card.id}
            symbol={card.symbol}
            isFlipped={flipped.includes(idx) || matched.includes(card.symbol)}
            onClick={() => handleFlip(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
