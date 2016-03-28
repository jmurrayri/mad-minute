import { Component } from 'angular2/core';
import {QuizService} from "../quiz/quiz.service";
import {Problem} from "../problem/problem";
import {ProblemComponent} from "../problem/problem.component";
import {ProblemState} from "../problem/problemState";

@Component({
    selector: 'results-component',
    template: require('./results.component.html'),
    styles: [require('./results.component.scss')],
    directives: [ProblemComponent]
})
export class ResultsComponent {
    private quizService : QuizService ;
    allProblems : Array<Problem>;

    constructor(private _quizService : QuizService) {
        this.quizService = _quizService;

        this.allProblems = this.quizService.allProblems;
    }
}
