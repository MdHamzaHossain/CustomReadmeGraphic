import express from "express";
import "dotenv/config";
import { GITHUB_USERNAME, requestGithub } from "./http.js";
import { generateStreak } from "./getStreak.js";
import { cardCanvas } from "./canvas.js";

const app = express();
const PORT = process.env.PORT;
export async function runSurver() {
    const user = await requestGithub("getGithubUser", {
        username: GITHUB_USERNAME,
    }).then((a) => a!.user)!;

    const streak = await generateStreak(user.contributionsCollection, user.createdAt);

    cardCanvas
        .text(`${user.name} has a streak of ${streak.totalDays}`)
        .move(20, 20)
        .font({ size: 20, fill: "#79dafa" });
    cardCanvas.text("COMING SOON!!!").move(20, 40).font({ size: 20, fill: "#79dafa" });

    app.get("/", (req, res) => {
        res.status(200).send(cardCanvas.svg());
    });
    app.use(express.json());

    app.listen(PORT, () => {
        console.log(`Server Running at http://localhost:${PORT}`);
    });
}
