import {Injectable} from 'angular2/core';

@Injectable()
export class TimerService {
    numberOfSeconds : number;
    running : boolean = false;

    start(_numberOfSeconds : number) {
        this.running = true;
        this.numberOfSeconds = _numberOfSeconds;

        this.tick();
    }

    private tick() {
        var self = this;
        if (self.running && self.numberOfSeconds > 1) {
            self.numberOfSeconds--;
            setTimeout(()=>{
                self.tick();
            }, 1000);
        }
        else {
            self.numberOfSeconds = 0;
            self.running = false;
        }
    }
}
