import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { first } from 'rxjs';
import { Categories } from '../models/categories';
import { QuizMakerService } from '../services/quiz-maker.service';
import { FilterableDropdownComponent } from '../filterable-dropdown/filterable-dropdown.component';
import { Quiz } from '../models/quiz';

@Component({
  selector: 'app-quiz-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FilterableDropdownComponent],
  templateUrl: './quiz-selector.component.html',
  styleUrls: ['./quiz-selector.component.css'],
})
export class QuizSelectorComponent {
  @Output()
  public onCreate = new EventEmitter<Quiz>();

  categories: Categories[] = [];
  difficulties: string[] = [];
  isValid = false;
  isLoading = false;
  selectedCategoryIdx = -1;
  selectedSubCategoryIdx = -1;
  selectedDifficulty = "";

  constructor(protected quizMakerService: QuizMakerService) {
    this.quizMakerService
      .fetchCategories()
      .pipe(first())
      .subscribe((categories) => {
        this.categories = categories;
      });
    this.difficulties = this.quizMakerService.getDifficulties();
  }

  categorySelected(categoryName: string) {
    this.selectedCategoryIdx = this.categories.findIndex(c => c.name === categoryName);
    this.checkSelectorValid();
  }

  subCategorySelected(categoryName: string) {
    this.selectedSubCategoryIdx = this.categories[this.selectedCategoryIdx].subCategories.findIndex(c => c.name === categoryName);
    this.checkSelectorValid();
  }

  checkSelectorValid() {
    this.isValid = this.selectedDifficulty !== "" &&
      this.selectedCategoryIdx !== -1 &&
      (this.categories[this.selectedCategoryIdx].subCategories.length === 0 || this.selectedSubCategoryIdx !== -1);
  }

  get category(): Categories {
    return this.categories[this.selectedCategoryIdx];
  }

  get categoryNames(): string[] {
    return this.categories.map(c => c.name);
  }

  get subCategoryNames(): string[] {
    return this.categories[this.selectedCategoryIdx].subCategories.map(c => c.name);
  }

  submit() {
    this.isLoading = true;
    const category = this.categories[this.selectedCategoryIdx];
    this.quizMakerService
      .fetchQuiz(
        (this.selectedSubCategoryIdx === -1 ? category.id : category.subCategories[this.selectedSubCategoryIdx].id).toString(),
        this.selectedDifficulty.toLowerCase(),
        true
      )
      .pipe(first())
      .subscribe((quiz) => {
        this.isLoading = false;
        this.onCreate.emit(quiz);
      });
  }
}
