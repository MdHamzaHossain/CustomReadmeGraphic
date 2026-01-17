/* eslint-disable @typescript-eslint/ban-ts-comment */
import "dotenv/config";
import { request } from "graphql-request";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { GithubRequestsData } from "../types/schemas.js";
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
export const GITHUB_USERNAME = process.env.GITHUB_USERNAME!;

const githubURL = "https://api.github.com/graphql";

let filesLoaded = false;
// @ts-ignore
const githubQueries: { [k in keyof GithubRequestsData]: string } = {};
async function loadGithubQueries() {
    const pathToQueries = join(process.cwd(), "queries");
    const files = await readdir(pathToQueries);
    for (const file of files) {
        const fileName = file.split(".")[0];
        const pathToFile = join(pathToQueries, file);
        const data = await readFile(pathToFile, { encoding: "utf8" }).catch(() => undefined);
        if (!data) {
            throw new Error(`File ${file} is unfetchable`);
        }
        // @ts-ignore
        githubQueries[fileName] = data;
    }
    filesLoaded = true;
}
export async function requestGithub<t extends keyof GithubRequestsData>(
    req: t,
    data: GithubRequestsData[t][1],
): Promise<GithubRequestsData[t][0] | undefined> {
    if (!filesLoaded) await loadGithubQueries();
    // @ts-expect-error
    return request(githubURL, githubQueries[req], data, { Authorization: "bearer " + GITHUB_TOKEN }).catch(undefined);
}
