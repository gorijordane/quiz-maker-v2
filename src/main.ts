import 'zone.js/dist/zone';
import { Component, importProvidersFrom } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, RouterModule, withComponentInputBinding } from '@angular/router';
import { QuizMakerService } from './app/services/quiz-maker.service';
import { HttpClientModule } from '@angular/common/http';
import { QuizResultsComponent } from './app/quiz-results/quiz-results.component';
import { QuizMakerComponent } from './app/quiz-maker/quiz-maker.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class App {
  name = 'QuizMaker';
}

const routes: Routes = [
  {
    path: '',
    providers: [QuizMakerService],
    children: [
      { path: 'results', component: QuizResultsComponent },
      {
        path: '',
        component: QuizMakerComponent,
        pathMatch: 'full',
      },
    ],
  },
];

bootstrapApplication(App, {
  providers: [provideRouter(routes, withComponentInputBinding()), importProvidersFrom(HttpClientModule)],
});
