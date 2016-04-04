import {Injectable} from 'angular2/core';

@Injectable()
export class TimerService {
    startingNumberOfSeconds : number;
    numberOfSeconds : number;
    running : boolean = false;
    secondsElapsed : number;
    start(_numberOfSeconds : number) {
        this.running = true;
        this.startingNumberOfSeconds = _numberOfSeconds;
        this.numberOfSeconds = _numberOfSeconds;
        this.secondsElapsed = 0;

        this.tick();
    }

    stop() {
        this.running = false;
    }

    private tick() {
        var self = this;
        if (self.numberOfSeconds <= 0) {
            self.running = false;
        }

        if (self.running) {
            self.numberOfSeconds--;
            self.secondsElapsed++;
            setTimeout(()=>{
                self.tick();
            }, 1000);
        }
    }
}
