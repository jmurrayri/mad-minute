import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import './app.scss';

import {QuizComponent} from './quiz/quiz.component';
import {HomeComponent} from "./home/home.component";
import {Router} from "angular2/router";
import {ROUTER_PROVIDERS} from "angular2/router";
import {TimerComponent} from "./timer/timer.component";
import {TimerService} from "./timer/timer.service";
import {QuizService} from "./quiz/quiz.service";
import {ResultsComponent} from "./results/results.component";

@Component({
    selector: 'app',
    template: require('./app.html'),
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, TimerService, QuizService]
})
@RouteConfig([
    {path: '/', component: HomeComponent, as: 'Home'},
    {path: '/quiz/:symbol', component: QuizComponent, as: 'Quiz'},
    {path: '/results', component: ResultsComponent, as: 'Results'}
])
export default class App {
}
