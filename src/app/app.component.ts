import { Component } from '@angular/core';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChessBoardComponent],
  template: `
    <h1>Angular Chess Game</h1>
    <app-chess-board></app-chess-board>
  `,
})
export class AppComponent {}
