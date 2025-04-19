const Card = ({ symbol, isFlipped, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 
        flex items-center justify-center 
        rounded-3xl cursor-pointer 
        shadow-[0_10px_30px_rgba(0,0,0,0.3)] 
        text-6xl sm:text-7xl md:text-8xl lg:text-9xl 
        font-extrabold transition-transform duration-300 ease-in-out 
        transform hover:scale-110
        ${isFlipped ? "bg-white text-black" : "bg-gray-900 text-gray-900"}
      `}
    >
      {isFlipped ? symbol : "?"}
    </div>
  );
};

export default Card;
