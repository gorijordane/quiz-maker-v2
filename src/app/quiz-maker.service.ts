import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Categories } from './categories';
import { Question } from './questions';

@Injectable()
export class QuizMakerService {
  constructor(protected httpClient: HttpClient) {}

  private readonly ApiCategoryUrl = 'https://opentdb.com/api_category.php';
  private readonly TriviaDatabaseApi =
    'https://opentdb.com/api.php?amount=5&category={0}&difficulty={1}&type=multiple';
  private readonly Difficulties = ['Easy', 'Medium', 'Hard'];

  public previousCategoryId = -1;
  public previousDifficultyId = -1;

  fetchCategories(): Observable<Categories[]> {
    return this.httpClient
      .get<{ trivia_categories: Categories[] }>(this.ApiCategoryUrl)
      .pipe(map((c) => c.trivia_categories));
  }

  getDifficulties(): string[] {
    return this.Difficulties;
  }

  fetchQuiz(category: string, difficulty: string): Observable<Question[]> {
    const req = this.TriviaDatabaseApi.replace('{0}', category).replace(
      '{1}',
      difficulty
    );
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
          return r.results.map((q) => {
            return {
              question: q.question,
              correctAnswer: q.correct_answer,
              possibleAnswers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
            };
          });
        })
      );
  }
}
