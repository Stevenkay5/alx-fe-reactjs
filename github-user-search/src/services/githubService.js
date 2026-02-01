import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
      ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
      : undefined,
  },
});

export const searchUsers = async ({
  query,
  location,
  minRepos,
  page = 1,
}) => {
  let searchQuery = query;

  if (location) searchQuery += ` location:${location}`;
  if (minRepos) searchQuery += ` repos:>=${minRepos}`;

  const response = await githubApi.get("/search/users", {
    params: {
      q: searchQuery,
      per_page: 10,
      page,
    },
  });

  return response.data;
};
