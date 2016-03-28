import {ProblemState} from "./problemState";
export class Problem  {
    public firstNumber: number;
    public symbol: string;
    public secondNumber: number;
    public givenAnswer: number;
    public correctAnswer: number;
    public problemState: ProblemState;

    constructor(firstNumber: number, secondNumber: number, symbol: string, correctAnswer: number) {
        this.problemState = ProblemState.NOT_ANSWERED;
        this.firstNumber = firstNumber;
        this.secondNumber = secondNumber;
        this.symbol = symbol;
        this.correctAnswer = correctAnswer;
    }

    public setAnswered() {
        if (this.givenAnswer === this.correctAnswer) {
            this.problemState = ProblemState.RIGHT;
        }
        else {
            this.problemState = ProblemState.WRONG;
        }
    }

    public setPresented() {
        this.problemState = ProblemState.PRESENTED;
    }

    public setSkipped() {
        this.problemState = ProblemState.SKIPPED;
    }

    public isRight() {
        return this.problemState === ProblemState.RIGHT;
    }

    public isWrong() {
        return this.problemState === ProblemState.WRONG;
    }

    public isSkipped() {
        return this.problemState === ProblemState.SKIPPED;
    }

    public isNotAnswered() {
        return this.problemState === ProblemState.NOT_ANSWERED ||
                this.problemState === ProblemState.PRESENTED;
    }
}
