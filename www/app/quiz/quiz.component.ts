import { Component, Input } from 'angular2/core';
import { ProblemComponent } from '../problem/problem.component';
import { Problem } from '../problem/problem';
import { TimerComponent } from '../timer/timer.component';
import {TimerService} from "../timer/timer.service";
import {QuizService} from "./quiz.service";
import {OnInit} from "angular2/core";
import {RouteParams} from "angular2/router";
import {ProblemType} from "../problem/problemType";
import Config from "../../config";
import {Router} from "angular2/router";

@Component({
    selector: 'quiz-component',
    template: require('./quiz.component.html'),
    styles: [require('./quiz.component.scss')],
    directives: [ProblemComponent, TimerComponent]
})
export class QuizComponent implements OnInit {
    private quizService : QuizService;
    private timerService : TimerService;
    private routeParams : RouteParams;
    private router : Router;

    problem : Problem;

    constructor(private _quizService : QuizService,
                private _timerService : TimerService,
                private _router : Router,
                private _routeParams : RouteParams) {
        this.quizService = _quizService;
        this.timerService = _timerService;
        this.routeParams = _routeParams;
        this.router = _router;
    }

    ngOnInit() {
        var symbol = this._routeParams.get('symbol');
        var problemType = ProblemType.findBySymbol(symbol);

        this.quizService.initialize(problemType);
        this.timerService.start(Config.MAX_SECONDS);

        this.problem = this.quizService.nextProblem();
        this.problem.setPresented();
    }

    next() {
        if (this.problem.isNotAnswered()) {
            this.problem.setAnswered();
        }

        this.problem = this.quizService.nextProblem();

        if (!this.problem || !this.timerService.running) {
            var route = ['Results'];
            this.router.navigate(route);
        }
        else {
            this.problem.setPresented();
        }
    }

    skip() {
        this.problem.setSkipped();

        this.next();
    }
}
