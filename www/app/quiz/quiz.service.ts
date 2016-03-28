import {Injectable} from 'angular2/core';
import {ProblemType} from "../problem/problemType";
import {Problem} from "../problem/problem";
import Config from "../../config";

@Injectable()
export class QuizService {
    private remainingProblems : Array<Problem> = [];
    allProblems : Array<Problem> = [];

    initialize(problemType : ProblemType) {
        this.allProblems = problemType.getAllProblems();
        this.remainingProblems = this.allProblems.slice(0);
    }

    nextProblem() {
        if (this.remainingProblems.length === 0) {
            return null;
        }

        var problem = this.remainingProblems[0];
        this.remainingProblems.splice(0, 1);

        return problem;
    }
}
