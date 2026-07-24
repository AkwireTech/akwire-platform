// ============================================
// AKWIRE LAB ENGINE v2
// Mission Scoring Engine
// ============================================

export class MissionScoring {

    constructor() {

        this.reset();

    }

    // --------------------------------
    // Reset Mission
    // --------------------------------

    reset() {

        this.score = 100;

        this.xp = 0;

        this.completedTasks = 0;

        this.totalTasks = 0;

        this.hintsUsed = 0;

        this.wrongAnswers = 0;

        this.startTime = Date.now();

        this.endTime = null;

    }

    // --------------------------------
    // Configure Mission
    // --------------------------------

    start(totalTasks) {

        this.reset();

        this.totalTasks = totalTasks;

    }

    // --------------------------------
    // Task Completed
    // --------------------------------

    completeTask() {

        this.completedTasks++;

        this.xp += 100;

    }

    // --------------------------------
    // Hint Penalty
    // --------------------------------

    useHint() {

        this.hintsUsed++;

        this.score = Math.max(0, this.score - 10);

    }

    // --------------------------------
    // Wrong Answer Penalty
    // --------------------------------

    wrongAnswer() {

        this.wrongAnswers++;

        this.score = Math.max(0, this.score - 5);

    }

    // --------------------------------
    // Finish Mission
    // --------------------------------

    finish() {

        this.endTime = Date.now();

    }

    // --------------------------------
    // Mission Time
    // --------------------------------

    getElapsedSeconds() {

        const end = this.endTime || Date.now();

        return Math.floor((end - this.startTime) / 1000);

    }

    // --------------------------------
    // Completion %
    // --------------------------------

    getCompletion() {

        if (this.totalTasks === 0)
            return 0;

        return Math.round(
            (this.completedTasks / this.totalTasks) * 100
        );

    }

    // --------------------------------
    // Grade
    // --------------------------------

    getGrade() {

        if (this.score >= 97) return "A+";

        if (this.score >= 93) return "A";

        if (this.score >= 90) return "A-";

        if (this.score >= 87) return "B+";

        if (this.score >= 83) return "B";

        if (this.score >= 80) return "B-";

        if (this.score >= 77) return "C+";

        if (this.score >= 73) return "C";

        if (this.score >= 70) return "C-";

        if (this.score >= 60) return "D";

        return "F";

    }

    // --------------------------------
    // Mission Summary
    // --------------------------------

    getResults() {

        return {

            score: this.score,

            xp: this.xp,

            completedTasks: this.completedTasks,

            totalTasks: this.totalTasks,

            completion: this.getCompletion(),

            hintsUsed: this.hintsUsed,

            wrongAnswers: this.wrongAnswers,

            grade: this.getGrade(),

            elapsedSeconds: this.getElapsedSeconds()

        };

    }

}