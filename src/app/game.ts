export class Game {
    players: string[] = [];
    stack: string[] = [];
    playedCards: string[] = [];
    currentPlayer: number = 0;
  
    constructor() {
      for (let i = 1; i < 14; i++) {
        this.stack.push('ace_' + i);
        this.stack.push('clubs_' + i);
        this.stack.push('diamonds_' + i);
        this.stack.push('hearts_' + i);
      }
  
      console.log('Original stack:', this.stack);
      this.shuffleStack();
      console.log('Shuffled stack:', this.stack);
    }
  
    shuffleStack() {
      for (let i = this.stack.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.stack[i], this.stack[j]] = [this.stack[j], this.stack[i]];
      }
    }
  }
  