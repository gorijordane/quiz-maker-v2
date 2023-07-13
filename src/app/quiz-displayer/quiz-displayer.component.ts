import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Question } from '../questions';
import { QuizMakerService } from '../quiz-maker.service';
import { CommonModule } from '@angular/common';
import { QuizQuestionComponent } from '../quiz-question/quiz-question.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quiz-displayer',
  standalone: true,
  imports: [CommonModule, RouterModule, QuizQuestionComponent],
  templateUrl: './quiz-displayer.component.html',
  styleUrls: ['./quiz-displayer.component.css'],
})
export class QuizDisplayerComponent implements OnChanges {
  @Input()
  questions: Question[] = [];

  allAnswerSelected = false;

  constructor(protected quizMakerService: QuizMakerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.checkAllAnswerSelected();
  }

  answerSelected() {
    this.checkAllAnswerSelected();
  }

  checkAllAnswerSelected() {
    this.allAnswerSelected =
      this.questions.length > 0 && this.questions.every((q) => q.userAnswer);
  }
}
