import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuizQuestionComponent } from '../quiz-question/quiz-question.component';
import { Question } from '../models/questions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [CommonModule, RouterModule, QuizQuestionComponent],
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css'],
})
export class QuizResultsComponent implements OnInit {
  questions: Question[] = [];
  score = 0;
  scoreColor = 'tranparent';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.questions = JSON.parse(this.route.snapshot.queryParams['questions']);
    this.score = this.questions.filter(
      (q) => q.userAnswer === q.correctAnswer
    ).length;
    switch (this.score) {
      case 0:
      case 1:
        this.scoreColor = 'red';
        break;
      case 2:
      case 3:
        this.scoreColor = 'yellow';
        break;
      case 4:
      case 5:
        this.scoreColor = 'green';
        break;
      default:
        break;
    }
  }
}
