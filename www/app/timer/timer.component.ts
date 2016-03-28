import { Component } from 'angular2/core';
import {TimerService} from "./timer.service";

@Component({
    selector: 'timer-component',
    template: require('./timer.component.html'),
    styles: [require('./timer.component.scss')]
})
export class TimerComponent {
    private timerService : TimerService;
    constructor(private _timerService : TimerService) {
        this.timerService = _timerService;
    }
}
