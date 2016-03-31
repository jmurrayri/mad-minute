import { Component, Input, Output, OnInit, EventEmitter } from 'angular2/core';
import { Problem } from './problem.ts';
import {ProblemState} from "./problemState";
import {ViewChild} from "angular2/core";

@Component({
    selector: 'problem-component',
    template: require('./problem.component.html'),
    styles: [require('./problem.component.scss')]
})
export class ProblemComponent implements OnInit {
    @Input() problem : Problem;
    @Output() next = new EventEmitter();
    @ViewChild('input1') input1ElementRef;
    keyupCount : number = 0;
    constructor() {
    }

    ngOnInit() {
        var self = this;
        setTimeout( () => self.input1ElementRef.nativeElement.focus() );
        //this.input1ElementRef.nativeElement.focus();
    }

    keyUp() {
        this.keyupCount++;
        if (this.keyupCount >=
            this.problem.correctAnswer.toString().length) {
            this.keyupCount = 0;
            this.next.emit(null);
        }
    }

    getStatusClass() {

        if (this.problem.problemState === ProblemState.PRESENTED) {
            return 'presented';
        }
        if (this.problem.problemState === ProblemState.NOT_ANSWERED) {
            return 'not-answered';
        }

        if (this.problem.problemState === ProblemState.RIGHT) {
            return 'right';
        }

        if (this.problem.problemState === ProblemState.WRONG) {
            return 'wrong';
        }

        if (this.problem.problemState === ProblemState.SKIPPED) {
            return 'skipped';
        }
    }
}
