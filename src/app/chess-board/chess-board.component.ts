import { Component, OnInit } from '@angular/core';
import { ChessService } from './chess.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chess-board',
  imports: [CommonModule], 
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css'],
})
export class ChessBoardComponent implements OnInit {
  board: any[][] = [];
  selectedSquare: string | null = null;
  turn: 'w' | 'b' = 'w';
  statusMessage: string = '';

  constructor(private chessService: ChessService) {}

  ngOnInit() {
    this.loadBoard();
    this.updateStatus();
  }

  loadBoard() {
    this.board = this.chessService.getBoard();
    this.turn = this.chessService.getTurn();
  }

  onSquareClick(row: number, col: number) {
    const square = this.coordsToSquare(row, col);

    if (this.selectedSquare === square) {
      this.selectedSquare = null;
      return;
    }

    if (!this.selectedSquare) {
      // Select a piece only if it is the current player's turn
      const piece = this.board[row][col];
      if (piece && piece.color === this.turn) {
        this.selectedSquare = square;
      }
    } else {
      // Try to move from selectedSquare to clicked square
      const moved = this.chessService.move(this.selectedSquare, square);
      if (moved) {
        this.selectedSquare = null;
        this.loadBoard();
        this.updateStatus();
      } else {
        // Invalid move, keep selectedSquare or reset
        this.selectedSquare = null;
      }
    }
  }

  coordsToSquare(row: number, col: number): string {
    const files = 'abcdefgh';
    const ranks = '87654321';
    return files[col] + ranks[row];
  }

  getPieceUnicode(piece: any) {
    if (!piece) return '';
  
    const unicodeWhite: any = {
      p: '♙',
      r: '♖',
      n: '♘',
      b: '♗',
      q: '♕',
      k: '♔',
    };
  
    const unicodeBlack: any = {
      p: '♟',
      r: '♜',
      n: '♞',
      b: '♝',
      q: '♛',
      k: '♚',
    };
  
    return piece.color === 'w' ? unicodeWhite[piece.type] : unicodeBlack[piece.type];
  }
  

  updateStatus() {
    if (this.chessService.isGameOver()) {
      this.statusMessage = this.chessService.getResult();
    } else {
      this.statusMessage = `Turn: ${this.turn === 'w' ? 'White' : 'Black'}`;
    }
  }

  resetGame() {
    this.chessService.reset();
    this.selectedSquare = null;
    this.loadBoard();
    this.updateStatus();
  }
}
