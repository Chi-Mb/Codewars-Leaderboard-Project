export async function getUserData(username) {
  const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
  
  // If the response status is not OK (like 404), throw an error
  if (!response.ok) throw new Error(`User "${username}" not found`);

  const data = await response.json();

  // Only overwrite 'honor' if the ranks and overall score exist
  // This prevents errors if those properties are missing (like in your test mock)
  if (
    data.ranks &&                      // check ranks exists
    data.ranks.overall &&              // check overall rank exists
    typeof data.ranks.overall.score === 'number'  // check score is a number
  ) {
    data.honor = data.ranks.overall.score;  // replace honor with the overall score
  }

  // Return the full user data object (modified or not)
  return data;
}

// Sorts an array of user data objects by 'honor' in descending order
export function processLeaderboardData(usersData) {
  return usersData.sort((a, b) => b.honor - a.honor);
}
