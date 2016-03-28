import { Problem } from "./problem";
import config from "../../config";

export class ProblemState  {
    public static PRESENTED : ProblemState = new ProblemState();
    public static NOT_ANSWERED : ProblemState = new ProblemState();
    public static RIGHT : ProblemState = new ProblemState();
    public static WRONG : ProblemState = new ProblemState();
    public static SKIPPED : ProblemState = new ProblemState();

    constructor() {
    }
}
