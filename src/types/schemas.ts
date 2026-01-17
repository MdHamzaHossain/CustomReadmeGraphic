interface GithubIssueConnection {
    nodes: GithubIssue[];
    totalCount: number;
}
interface GithubLanguageConnection {
    totalCount: number;
    totalSize: number;
    nodes: GithubLanguage[];
}
interface GithubLanguage {
    color: string;
    name: string;
}
interface GithubPullRequestConnection {
    nodes: GithubPullRequest[];
    totalCount: number;
}
interface GithubPullRequest {
    closed: boolean;
}
interface GithubIssue {
    closed: boolean;
}
interface GithubRepository {
    archivedAt: string;
    createdAt: string;
    description: string;
    diskUsage: number;
    homepageUrl: string;
    isPrivate: boolean;
    name: string;
    languages: GithubLanguageConnection[];
    updatedAt: string;
}
interface GithubRepositoryConnection {
    nodes: GithubRepository[];
    totalCount: number;
}
interface GithubContributionsCollection {
    contributionCalendar: {
        weeks: Array<{
            contributionDays: {
                contributionCount: number;
                date: string;
            }[];
        }>;
        totalContributions: number;
    };
}
export interface GithubUser {
    avatarUrl: string;
    createdAt: string;
    email: string;
    issues: GithubIssueConnection;
    name: string;
    pullRequests: GithubPullRequestConnection[];
    repositories: GithubRepositoryConnection[];
    websiteUrl: string;
    followers: { totalCount: number };
    contributionsCollection: GithubContributionsCollection;
}
interface GithubGetUserOutput {
    user: GithubUser;
}
interface GithubGetUserData {
    username: string;
    streakTo?: string;
    streakFrom?: string;
}
interface GithubGetUserContributionsOutput {
    user: Pick<GithubUser, "contributionsCollection">;
}
interface GithubGetUserContributionsData {
    username: string;
    streakTo?: string;
    streakFrom?: string;
}
export interface GithubRequestsData {
    getGithubUser: [GithubGetUserOutput, GithubGetUserData];
    getGithubContributions: [GithubGetUserContributionsOutput, GithubGetUserContributionsData];
}
