import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QuizMakerService } from '../services/quiz-maker.service';
import { CommonModule } from '@angular/common';
import { QuizQuestionComponent } from '../quiz-question/quiz-question.component';
import { RouterModule } from '@angular/router';
import { Quiz } from '../models/quiz';

@Component({
  selector: 'app-quiz-displayer',
  standalone: true,
  imports: [CommonModule, RouterModule, QuizQuestionComponent],
  templateUrl: './quiz-displayer.component.html',
  styleUrls: ['./quiz-displayer.component.css'],
})
export class QuizDisplayerComponent implements OnChanges {
  @Input()
  quiz!: Quiz;

  allAnswerSelected = false;

  constructor(protected quizMakerService: QuizMakerService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkAllAnswerSelected();
  }

  answerSelected() {
    this.checkAllAnswerSelected();
  }

  changeQuestion(idx: number) {
    this.quiz.questions[idx] = this.quiz.extraQuestion!;
    delete this.quiz.extraQuestion;
    this.allAnswerSelected = false;
  }

  checkAllAnswerSelected() {
    this.allAnswerSelected =
      this.quiz.questions.length > 0 && this.quiz.questions.every((q) => q.userAnswer);
  }
}
