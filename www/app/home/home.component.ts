import { Component, Input, Output, OnInit, EventEmitter } from 'angular2/core';
import {Router} from "angular2/router";
import {ROUTER_PROVIDERS} from "angular2/router";
import {ProblemType} from "../problem/problemType";

@Component({
    selector: 'home-component',
    template: require('./home.component.html'),
    styles: [require('./home.component.scss')]
})
export class HomeComponent {
    private router : Router;
    addType : ProblemType = ProblemType.ADDITION;
    multiplyType : ProblemType = ProblemType.MULTIPLICATION;
    divideType : ProblemType = ProblemType.DIVISION;
    subtractType : ProblemType = ProblemType.SUBTRACTION;

    constructor(private _router : Router) {
        this.router = _router;
    }

    start(_problemType : ProblemType) {
        var route = ['Quiz', { symbol: _problemType.symbol}];
        this.router.navigate(route);
    }
}
