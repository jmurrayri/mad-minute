import { Problem } from "./problem";
import config from "../../config";
import Config from "../../config";

export class ProblemType  {
    public static ADDITION: ProblemType = new ProblemType('+', false);
    public static MULTIPLICATION: ProblemType = new ProblemType('X', false);
    public static DIVISION: ProblemType = new ProblemType('÷', true);
    public static SUBTRACTION: ProblemType = new ProblemType('-', false);
    public static ALL: ProblemType = new ProblemType('+X÷-', false);

    public static findBySymbol(symbol : string) {
        if (symbol === ProblemType.ADDITION.symbol) {
            return ProblemType.ADDITION;
        }
        else if (symbol === ProblemType.MULTIPLICATION.symbol) {
            return ProblemType.MULTIPLICATION;
        }
        else if (symbol === ProblemType.DIVISION.symbol) {
            return ProblemType.DIVISION;
        }
        else if (symbol === ProblemType.SUBTRACTION.symbol) {
            return ProblemType.SUBTRACTION;
        }
        else if (symbol === ProblemType.ALL.symbol) {
            return ProblemType.ALL;
        }
        else {
            throw new Error('Unexpected symbol');
        }
    }

    symbol : string;
    private isDivision : boolean;

    constructor(symbol: string, isDivision: boolean) {
        this.symbol = symbol;
        this.isDivision = isDivision;
    }

    public getAllProblems() {
        var minimum = 0;
        var maximum = config.MAX_NUMBER;
        var allProblems = [];
        var problem;
        var firstNumber;
        var secondNumber;

        for (var i = minimum; i <= maximum; i++) {
            for (var j = i; j <= maximum; j++) {

                if (this.trueOrFalse()) {
                    firstNumber = i;
                    secondNumber = j;
                }
                else {
                    firstNumber = j;
                    secondNumber = i;
                }

                if (this.symbol.indexOf('+') >= 0) {
                    problem = new Problem(firstNumber, secondNumber, '+', i + j);

                    allProblems.push(problem);
                }

                if (this.symbol.indexOf('X') >= 0) {
                    problem = new Problem(firstNumber, secondNumber, 'X', i * j);

                    allProblems.push(problem);
                }

                if (i > 0 && this.symbol.indexOf('÷') >= 0) {
                    var product = firstNumber * secondNumber;
                    problem = new Problem(product, firstNumber, '÷', secondNumber);

                    allProblems.push(problem);
                }

                if (this.symbol.indexOf('-') >= 0) {
                    var larger;
                    var smaller;

                    if (firstNumber > secondNumber) {
                        larger = firstNumber;
                        smaller = secondNumber;
                    }
                    else {
                        larger = secondNumber;
                        smaller = firstNumber;
                    }
                    problem = new Problem(larger, smaller, '-', larger - smaller);

                    allProblems.push(problem);
                }
            }
        }

        // For division, support zeros as numerator.
        if (this.symbol.indexOf('÷') >= 0) {
            for (var i = 0; i <= maximum; i++) {
                allProblems.push(new Problem(0, i, '÷', 0));
            }
        }

        var result = [];
        for (i = 0; i < Config.MAX_ANSWERS; i++) {
            var randomIndex = Math.floor(Math.random() * allProblems.length);

            result.push(allProblems[randomIndex]);
            allProblems.splice(randomIndex, 1);
        }

        return result;
    }

    private trueOrFalse() {
        var index = Math.floor(Math.random() * 2);

        return index === 0;
    }
}
