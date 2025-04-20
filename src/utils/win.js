import confetti from "canvas-confetti";

const fireConfetti = () => {
  confetti({
    particleCount: 100,      
    spread: 70,              
    origin: { y: 0.6 }       
  });
};


export default fireConfetti;