import { requestGithub, GITHUB_USERNAME } from "./common/http.js";
import { generateStreak } from "./getStreak.js";
async function main() {
    const user = await requestGithub("getGithubUser", {
        username: GITHUB_USERNAME,
    }).then((a) => a!.user)!;
    console.log(user.name);
    const streak = await generateStreak(user.contributionsCollection, user.createdAt);
}

// FOR NOW
main();
