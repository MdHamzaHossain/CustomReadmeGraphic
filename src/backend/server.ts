import express from "express";
import "dotenv/config";
import { GITHUB_USERNAME, requestGithub } from "./http.js";
import { generateStreak } from "./getStreak.js";

const app = express();
const PORT = process.env.PORT!;
export async function runSurver() {
    const user = await requestGithub("getGithubUser", {
        username: GITHUB_USERNAME,
    }).then((a) => a!.user)!;
    const streak = await generateStreak(user.contributionsCollection, user.createdAt);
    // TODO
    //.text(`${user.name} has a streak of ${streak.totalDays}`)

    app.get("/", (req, res) => {
        res.status(200);
        //.send(cardCanvas.svg());
    });
    app.use(express.json());
    // @ts-expect-error: i have no clue
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server Running at http://localhost:${PORT}`);
    });
}
