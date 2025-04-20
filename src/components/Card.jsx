const Card = ({ symbol, isFlipped, isMatched , onClick, cardSize }) => {
  return (
    <div
      onClick={onClick}
      className={`perspective cursor-pointer ${cardSize}`}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${isFlipped ? "rotate-y-180" : ""}   ${isMatched ? "animate-match-bounce" : ""}`}
      >
        {/* Front side (hidden when flipped) */}
        <div className="absolute w-full h-full backface-hidden bg-gray-900 text-gray-900 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
          ❓
        </div>


        {/* Back side (visible when flipped) */}
        <div className="absolute w-full h-full backface-hidden bg-white text-black rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold transform rotate-y-180">
          {symbol}
        </div>
      </div>
    </div>
  );
};

export default Card;
