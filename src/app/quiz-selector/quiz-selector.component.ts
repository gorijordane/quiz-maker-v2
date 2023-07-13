import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { first } from 'rxjs';
import { Question } from '../questions';
import { Categories } from '../categories';
import { QuizMakerService } from '../quiz-maker.service';

@Component({
  selector: 'app-quiz-selector',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quiz-selector.component.html',
  styleUrls: ['./quiz-selector.component.css'],
})
export class QuizSelectorComponent {
  @Output()
  public onCreate = new EventEmitter<Question[]>();

  categories: Categories[] = [];
  difficulties: string[] = [];
  quizForm: FormGroup;
  isLoading = false;

  constructor(protected quizMakerService: QuizMakerService) {
    this.quizForm = new FormGroup(
      {
        categories: new FormControl(this.quizMakerService.previousCategoryId),
        difficulties: new FormControl(
          this.quizMakerService.previousDifficultyId
        ),
      },
      { validators: this.checkInputs }
    );
    this.quizMakerService
      .fetchCategories()
      .pipe(first())
      .subscribe((categories) => {
        this.categories = categories;
      });
    this.difficulties = this.quizMakerService.getDifficulties();
  }

  private checkInputs(c: AbstractControl) {
    if (
      c.get('categories')?.value !== -1 &&
      c.get('difficulties')?.value !== -1
    ) {
      return null;
    }
    return {
      invalidCategory: c.get('categories')?.value !== -1,
      invalidDifficulty: c.get('difficulties')?.value !== -1,
    };
  }

  onSubmit() {
    this.isLoading = true;
    this.quizMakerService.previousCategoryId =
      this.quizForm.controls['categories'].value;
    this.quizMakerService.previousDifficultyId =
      this.quizForm.controls['difficulties'].value;
    this.quizMakerService
      .fetchQuiz(
        this.quizForm.controls['categories'].value,
        this.quizForm.controls['difficulties'].value.toLowerCase()
      )
      .pipe(first())
      .subscribe((questions) => {
        this.isLoading = false;
        this.onCreate.emit(questions);
      });
  }
}
