import { Component } from 'angular2/core';
import {QuizService} from "../quiz/quiz.service";
import {Problem} from "../problem/problem";
import {ProblemComponent} from "../problem/problem.component";
import {ProblemState} from "../problem/problemState";
import Config from "../../config";
import {Router} from "angular2/router";
import {TimerService} from "../timer/timer.service";

@Component({
    selector: 'results-component',
    template: require('./results.component.html'),
    styles: [require('./results.component.scss')],
    directives: [ProblemComponent]
})
export class ResultsComponent {
    private quizService : QuizService ;
    timer : TimerService;
    allProblems : Array<Problem>;
    answered : number;
    total : number;
    right : number;
    wrong : number;

    constructor(private _quizService : QuizService,
                private _timerService : TimerService,
                private _router : Router) {
        var self = this;
        this.quizService = _quizService;
        this.timer = _timerService;

        this.allProblems = this.quizService.allProblems;

        this.total = Config.MAX_ANSWERS;
        this.answered = 0;
        this.right = 0;
        this.wrong = 0;

        this.allProblems.forEach(function(p) {
            if (!p.isNotAnswered()) {
                self.answered++;
            }

            if (p.isRight()) {
               self.right++;
            }
            else if (p.isWrong()) {
                self.wrong++;
            }
        });
    }

    playAgain() {
        var route = ['Home'];
        this._router.navigate(route);
    }
}
