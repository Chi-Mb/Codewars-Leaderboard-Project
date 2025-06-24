// Fetch user data from Codewars API
export async function getUserData(username) {
  const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
  if (!response.ok) throw new Error(`User "${username}" not found`);
  return await response.json();
}

// Process leaderboard data to sort users by honor in descending order
export function processLeaderboardData(usersData) {
  return usersData.sort((a, b) => b.honor - a.honor);
}
