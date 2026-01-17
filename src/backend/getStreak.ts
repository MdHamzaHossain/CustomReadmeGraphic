import { setTimeout } from "node:timers/promises";
import { GITHUB_USERNAME, requestGithub } from "./http.js";
import { GithubUser } from "../types/schemas.js";

interface GithubStreak {
    start: Date;
    end: Date;
    totalCommits: number;
    totalDays: number;
}
export async function generateStreak(
    contributions: GithubUser["contributionsCollection"],
    createdAt: string,
): Promise<GithubStreak> {
    const days: GithubUser["contributionsCollection"]["contributionCalendar"]["weeks"][number]["contributionDays"] = [];

    const creationDate = new Date(createdAt);
    let weeks = contributions.contributionCalendar.weeks;
    weeks.reverse();
    for (const week of weeks) {
        for (const day of week.contributionDays) {
            days.push(day);
        }
    }
    // @ts-expect-error: Date arithmatic is valid
    days.sort((a, b) => new Date(b.date) - new Date(a.date));

    while (new Date(days.at(-1)?.date ?? createdAt) > creationDate) {
        await setTimeout(500);
        const newTo = new Date(days.at(-1)!.date);
        let newFrom = new Date(newTo);
        newFrom = new Date(newTo);
        // console.log(`1 Fetching from   ${newFrom.toUTCString()} to ${newTo.toDateString()}`);

        newFrom.setFullYear(newTo.getUTCFullYear() - 1);

        const newData = await fetchUserGithubContributions(newFrom, newTo);

        if (newData) {
            weeks = newData.contributionsCollection.contributionCalendar.weeks.reverse();
        }
        for (const week of weeks) {
            for (const day of week.contributionDays) {
                days.push(day);
            }
        }
        // console.log(" Debug date : ");
        // break;
    }
    // @ts-expect-error: Date arithmatic is valid
    days.sort((a, b) => new Date(b.date) - new Date(a.date));

    let currentStreak = 0;
    let mxStreak = 0;
    let startDate = days[0].date;
    let endDate = days[0].date;
    let strk: GithubStreak = {
        totalDays: 0,
        start: new Date(creationDate),
        end: new Date(creationDate),
        totalCommits: 0,
    };
    let totComs = 0;
    for (const day of days) {
        if (day.contributionCount > 0) {
            currentStreak++;
            totComs += day.contributionCount;
        } else {
            const t = startDate;
            startDate = endDate;
            endDate = day.date;
            if (currentStreak > mxStreak) {
                mxStreak = currentStreak;
                strk = {
                    start: new Date(t),
                    end: new Date(endDate),
                    totalDays: 0,
                    totalCommits: totComs,
                };
                // @ts-expect-error: Date arithmatic is valid
                strk.totalDays = Math.ceil((strk.start - strk.end) / (3600 * 24 * 1000));
                strk.end = new Date(strk.end.getTime() + 3600 * 24 * 1000);
            }
            currentStreak = 0;
            totComs = 0;
        }
    }
    if (currentStreak > mxStreak) {
        mxStreak = currentStreak;
        strk = {
            start: new Date(startDate),
            end: new Date(endDate),
            totalDays: currentStreak,
            totalCommits: totComs,
        };
    }
    return strk;
}
export async function fetchUserGithubContributions(from: Date, to: Date) {
    const res = await requestGithub("getGithubContributions", {
        username: GITHUB_USERNAME,
        streakFrom: from.toISOString(),
        streakTo: to.toISOString(),
    })
        .then((a) => a?.user)
        .catch(() => undefined);
    // console.log(res?.contributionsCollection.contributionCalendar.totalContributions);
    return res;
}
