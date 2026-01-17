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
        weeks: {
            contributionDays: {
                date: string;
            };
        };
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
    contributionsCollection: GithubContributionsCollection[];
}
interface GithubGetUserData {
    user: GithubUser;
}
interface GithubGetUserOutput {
    login: string;
}
export interface GithubRequestsData {
    getGithubUser: [GithubGetUserData, GithubGetUserOutput];
}
