import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Question } from '../questions';
import { QuizDisplayerComponent } from '../quiz-displayer/quiz-displayer.component';
import { QuizSelectorComponent } from '../quiz-selector/quiz-selector.component';

@Component({
  selector: 'app-quiz-maker',
  standalone: true,
  imports: [CommonModule, QuizSelectorComponent, QuizDisplayerComponent],
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css'],
})
export class QuizMakerComponent {
  questions: Question[] = [];

  constructor() {}
}
