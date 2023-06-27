import { type ApiInput, type ApiPromise, type ApiResponse } from './types';

const endpoint = 'https://coding-contributions-api.vercel.app/api/';

const getGithubActivity = async (username: string): Promise<ApiResponse> => {
  const url = `${endpoint}/github?username=${username}`;
  return (await fetch(url).then(async (res) => res.json())) as ApiResponse;
};

const getLeetCodeActivity = async (username: string): Promise<ApiResponse> => {
  const url = `${endpoint}/leetcode?username=${username}`;
  return (await fetch(url).then(async (res) => res.json())) as ApiResponse;
};

const getHackerRankActivity = async (
  username: string,
): Promise<ApiResponse> => {
  const url = `${endpoint}/hackerrank?username=${username}`;
  return (await fetch(url).then(async (res) => res.json())) as ApiResponse;
};

export const getApiActivity = async ({
  site,
  username,
}: ApiInput): ApiPromise => {
  switch (site) {
    case 'github':
      return getGithubActivity(username);
    case 'leetCode':
      return getLeetCodeActivity(username);
    case 'hackerRank':
      return getHackerRankActivity(username);
    default:
      return Promise.resolve({ contributions: {} });
  }
};
