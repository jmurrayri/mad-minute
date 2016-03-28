import { Problem } from "./problem";
import config from "../../config";
import Config from "../../config";

export class ProblemType  {
    public static ADDITION: ProblemType = new ProblemType('+', false);
    public static MULTIPLICATION: ProblemType = new ProblemType('X', false);
    public static DIVISION: ProblemType = new ProblemType('÷', true);

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
        var minimum = this.isDivision ? 1 : 0;
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

                switch (this.symbol) {
                    case "+":
                        problem = new Problem(firstNumber, secondNumber, this.symbol, i + j);
                        break;
                    case "X":
                        problem = new Problem(firstNumber, secondNumber, this.symbol, i * j);
                        break;
                    case "÷":
                        var product = firstNumber * secondNumber;
                        problem = new Problem(product, firstNumber, this.symbol, secondNumber);
                        break;
                    default:
                        throw new Error("Unknown symbol.");
                }
                allProblems.push(problem);
            }
        }

        // For division, support zeros as numerator.
        if (this.isDivision) {
            for (var i = 0; i <= maximum; i++) {
                allProblems.push(new Problem(0, i, this.symbol, 0));
            }
        }

        var result = [];
        for (i = 0; i < Config.MAX_ANSWERS - 1; i++) {
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
