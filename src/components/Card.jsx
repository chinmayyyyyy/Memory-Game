const Card = ({ symbol, isFlipped, onClick }) => {
    return (
      <div
        onClick={onClick}
        className={`w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 
          flex items-center justify-center rounded-2xl cursor-pointer shadow-xl 
          text-5xl sm:text-6xl md:text-7xl font-bold transition-all duration-300
          transform hover:scale-105
          ${isFlipped ? "bg-white text-black" : "bg-gray-800 text-gray-800"}
        `}
      >
        {isFlipped ? symbol : "?"}
      </div>
    );
  };
  
  export default Card;
  