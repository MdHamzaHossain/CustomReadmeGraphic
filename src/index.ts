import { requestGithub, GITHUB_USERNAME } from "./common/http.js";

async function main() {
    requestGithub("getGithubUser", { login: GITHUB_USERNAME }).then(console.log);
}
// FOR NOW
main();
