import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Categories } from '../models/categories';
import { Question } from '../models/questions';
import { Quiz } from '../models/quiz';

@Injectable()
export class QuizMakerService {
  constructor(protected httpClient: HttpClient) { }

  private readonly ApiCategoryUrl = 'https://opentdb.com/api_category.php';
  private readonly TriviaDatabaseApi =
    'https://opentdb.com/api.php?amount={0}&category={1}&difficulty={2}&type=multiple';
  private readonly Difficulties = ['Easy', 'Medium', 'Hard'];

  fetchCategories(): Observable<Categories[]> {
    return this.httpClient
      .get<{ trivia_categories: Categories[] }>(this.ApiCategoryUrl)
      .pipe(map((c) => this.parseCategories(c.trivia_categories)));
  }

  private parseCategories(categories: Categories[]) {
    const newCategories: Categories[] = [];
    categories.forEach((c => {
      if (c.name.includes(':')) {
        const newCategory = c.name.split(':')[0];
        const idx = newCategories.findIndex(c => c.name === newCategory);
        if (idx === -1) {
          newCategories.push({ id: 0, name: newCategory, subCategories: [{ ...c, name: c.name.split(':')[1].trim() }] });
        }
        else {
          newCategories[idx].subCategories!.push({ ...c, name: c.name.split(':')[1].trim() });
        }
      }
      else {
        newCategories.push({ ...c, subCategories: [] });
      }
    }));
    return newCategories;
  }

  getDifficulties(): string[] {
    return this.Difficulties;
  }

  fetchQuiz(category: string, difficulty: string, extraQuestion = false, number = 5): Observable<Quiz> {
    const req = this.TriviaDatabaseApi.replace('{0}', (number + +extraQuestion).toString()).replace(
      '{1}',
      category
    ).replace('{2}', difficulty);
    return this.httpClient
      .get<{
        results: {
          question: string;
          correct_answer: string;
          incorrect_answers: string[];
        }[];
      }>(req)
      .pipe(
        map((r) => {
          let questions: Question[] = r.results.map((q) => {
            return {
              question: q.question,
              correctAnswer: q.correct_answer,
              possibleAnswers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
            };
          });
          if (extraQuestion) {
            return {
              extraQuestion: questions.pop(),
              questions
            };
          }
          return {
            questions
          }
        })
      );
  }
}
