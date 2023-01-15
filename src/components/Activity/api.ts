import axios from 'axios';
import { type ApiInput, type ApiPromise, type ApiResponse } from './types';

const endpoint = 'https://coding-contributions-api.vercel.app/api/';

const getGithubActivity = async (username: string): Promise<ApiResponse> => {
  const url = `${endpoint}/github?username=${username}`;
  const { data } = await axios.get<ApiResponse>(url);
  return data;
};

const getLeetCodeActivity = async (username: string): Promise<ApiResponse> => {
  const url = `${endpoint}/leetcode?username=${username}`;
  const { data } = await axios.get<ApiResponse>(url);
  return data;
};

const getHackerRankActivity = async (
  username: string,
): Promise<ApiResponse> => {
  const url = `${endpoint}/hackerrank?username=${username}`;
  const { data } = await axios.get<ApiResponse>(url);
  return data;
};

export const getApiActivity = async ({
  site,
  username,
}: // eslint-disable-next-line require-await
ApiInput): ApiPromise => {
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
