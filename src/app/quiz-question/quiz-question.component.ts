import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../questions';

@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css'],
})
export class QuizQuestionComponent {
  @Input()
  question!: Question;

  @Input()
  displayAnswer = false;

  @Output()
  answerSelected = new EventEmitter();

  constructor() {}

  clickAnswer(possibleAnswer: string) {
    this.question.userAnswer = possibleAnswer;
    this.answerSelected.emit();
  }
}
