import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuizDisplayerComponent } from '../quiz-displayer/quiz-displayer.component';
import { QuizSelectorComponent } from '../quiz-selector/quiz-selector.component';
import { Quiz } from '../models/quiz';

@Component({
  selector: 'app-quiz-maker',
  standalone: true,
  imports: [CommonModule, QuizSelectorComponent, QuizDisplayerComponent],
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css'],
})
export class QuizMakerComponent {
  quiz: Quiz | null = null;

  constructor() { }
}
