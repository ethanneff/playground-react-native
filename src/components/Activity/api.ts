import axios from 'axios';
import { ApiInput, ApiPromise, ApiResponse } from './types';

const endpoint = 'https://coding-contributions.vercel.app/api/';

const getGithubActivity = async (username: string): Promise<ApiResponse> => {
  const url = `${endpoint}/github?username=${username}`;
  const { data } = await axios.get<ApiResponse>(url);
  return data;
};

const getLeetCodeActivity = async (username: string) => {
  const url = `${endpoint}/leetcode?username=${username}`;
  const { data } = await axios.get<ApiResponse>(url);
  return data;
};

const getHackerRankActivity = async (username: string) => {
  const url = `${endpoint}/hackerrank?username=${username}`;
  const { data } = await axios.get<ApiResponse>(url);
  return data;
};

export const getApiActivity = ({ username, site }: ApiInput): ApiPromise => {
  switch (site) {
    case 'github':
      return getGithubActivity(username);
    case 'leetCode':
      return getLeetCodeActivity(username);
    case 'hackerRank':
      return getHackerRankActivity(username);
    default:
      return Promise.resolve({});
  }
};
