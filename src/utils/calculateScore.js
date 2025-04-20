const calculateScore = (time, tries, difficulty) => {
    let difficultyModifier = 1;
    switch (difficulty) {
      case "easy":
        difficultyModifier = 0.8;  
        break;
      case "medium":
        difficultyModifier = 1.0;  
        break;
      case "hard":
        difficultyModifier = 1.2;  
        break;
      default:
        difficultyModifier = 1.0;
    }

    const score = (time / tries) * difficultyModifier;

    return score;
};
export default calculateScore;