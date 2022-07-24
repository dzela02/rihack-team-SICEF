import httpClient from '../httpClient';

function getLeaderboard() {
  return httpClient.get(`/leaderboard`);
}

export { getLeaderboard };
