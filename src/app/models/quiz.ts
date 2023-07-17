import { Question } from "./questions";

export interface Quiz {
    questions: Question[];
    extraQuestion?: Question;
}
