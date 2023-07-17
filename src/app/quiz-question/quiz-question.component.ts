import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../models/questions';

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

  @Input()
  isExtraQuestion = false;

  @Output()
  answerSelected = new EventEmitter();

  @Output()
  useExtraQuestion = new EventEmitter();

  constructor() { }

  clickAnswer(possibleAnswer: string) {
    this.question.userAnswer = possibleAnswer;
    this.answerSelected.emit();
    console.log(possibleAnswer, this.question)
  }
}
