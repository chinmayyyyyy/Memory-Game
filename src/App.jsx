import { useEffect, useState } from "react";
import Card from "./components/Card";
import { shuffle } from "./utils/shuffle";
import calculateScore from "./utils/calculateScore";

// Symbol data
const symbols = [
  '🐶', '🐱', '🐵', '🐸', '🦄', '🐼', '🐯', '🐷', '🦊', '🐨', '🦄', '🦜', 
  '🐺', '🐯', '🦉', '🐸', '🐍', '🐆'
];

const useGame = (difficulty) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [tries, setTries] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [hasFlippedFirstCard, setHasFlippedFirstCard] = useState(false);
  const [audio] = useState(new Audio());

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

    // Play flip sound
    audio.src = "/music/flip.mp3";
    audio.play();

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const isMatch = cards[first].symbol === cards[second].symbol;
      setTimeout(() => {
        if (isMatch) {
          setMatched((prev) => [...prev, cards[first].symbol]);
          // Play match sound
          audio.src = "/music/match.mp3";
          audio.play();
        }
        setFlipped([]);
        setTries((prev) => prev + 1);
      }, 700);
    }
  };

  const updateTimer = () => {
    let interval = null;
    if (isGameActive && hasFlippedFirstCard && matched.length !== cards.length / 2) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 0.01);
      }, 10);
    }

    if (matched.length === cards.length / 2 && isGameActive) {
      setIsGameActive(false);
      audio.src = "/music/win.mp3";
      audio.play();
      const currentScore = calculateScore(timer, tries, difficulty);
      localStorage.setItem("bestScore", currentScore.toFixed(2));
    }

    return () => clearInterval(interval);
  };

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  useEffect(updateTimer, [matched, isGameActive, hasFlippedFirstCard, timer, tries]);

  return {
    cards,
    flipped,
    matched,
    tries,
    timer,
    isGameActive,
    handleFlip,
    resetGame,
    getGridSize,
  };
};

const App = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const { cards, flipped, matched, tries, timer, handleFlip, resetGame, getGridSize } = useGame(difficulty);

  const getCardSize = () => {
    switch (difficulty) {
      case "easy": return "w-32 h-32 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"; 
      case "medium": return "w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-28 lg:h-28"; 
      case "hard": return "w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"; 
      default: return "w-32 h-32 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"; 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white bg-[url('/micro_carbon.png')] bg-repeat flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-center text-purple-400 drop-shadow-lg">
        🧠 Memory Match
      </h1>
  
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <label htmlFor="difficulty" className="text-lg font-medium">Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="easy">Easy (2x2)</option>
          <option value="medium">Medium (4x4)</option>
          <option value="hard">Hard (6x6)</option>
        </select>
  
        <button
          className="bg-purple-700 hover:bg-purple-800 px-6 py-2 rounded-lg font-semibold shadow-md transition duration-200"
          onClick={resetGame}
        >
          Restart 🔄
        </button>
      </div>
  
      <div className="text-lg sm:text-xl space-y-1 mb-6 text-center">
        <div>🧪 Tries: <span className="font-bold">{tries}</span></div>
        <div>⏱️ Time: <span className="font-bold">{timer.toFixed(2)}s</span></div>
        {matched.length === cards.length / 2 && (
          <div className="text-green-400 font-bold text-xl">
            🎉 Score: {(timer / tries).toFixed(2)}s
          </div>
        )}
      </div>
  
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${getGridSize()}, 1fr)` }}
      >
        {cards.map((card, idx) => (
          <Card
            key={card.id}
            symbol={card.symbol}
            isFlipped={flipped.includes(idx) || matched.includes(card.symbol)}
            onClick={() => handleFlip(idx)}
            cardSize={getCardSize()}  // Pass dynamic card size based on difficulty
          />
        ))}
      </div>
    </div>
  );
};

export default App;
