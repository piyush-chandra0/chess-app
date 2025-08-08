import { Injectable } from '@angular/core';
import { Chess } from 'chess.js';

@Injectable({
  providedIn: 'root',
})
export class ChessService {
  private chess = new Chess();

  getBoard() {
    return this.chess.board();
  }

  move(from: string, to: string): boolean {
    const move = this.chess.move({ from, to, promotion: 'q' });
    return move !== null;
  }

  getTurn(): 'w' | 'b' {
    return this.chess.turn();
  }

  isGameOver(): boolean {
    return this.chess.isGameOver();
  }

  getResult(): string {
    if (this.chess.isCheckmate()) return 'Checkmate!';
    if (this.chess.isStalemate()) return 'Stalemate!';
    if (this.chess.isDraw()) return 'Draw!';
    return '';
  }

  reset() {
    this.chess.reset();
  }
}
