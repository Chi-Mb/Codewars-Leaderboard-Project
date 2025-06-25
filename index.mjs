// Import functions from logic.mjs
import { getUserData, processLeaderboardData } from './logic.mjs';


const fetchBtn = document.getElementById('fetchButton');
const usernamesInput = document.getElementById('usernamesInput');
const outputDiv = document.getElementById('leaderboard');


fetchBtn.addEventListener('click', async () => {
  outputDiv.innerHTML = ''; // Clear previous output

  // Get usernames, split by comma, trim spaces, filter out empty strings
  const usernames = usernamesInput.value
    .split(',')
    .map(name => name.trim())
    .filter(name => name.length > 0);

  if (usernames.length === 0) {
    outputDiv.textContent = 'Please enter at least one username.';
    return;
  }

  // Displays a message while fetching data
  outputDiv.textContent = 'Fetching data...';

  // Fetch user data for all usernames in parallel using Promise.all
  try {
    const usersData = await Promise.all(
      usernames.map(username => getUserData(username)) // Reuse the getUserData function
    );

    // Sorts users by honor in descending order using the imported logic function
    const sortedUsers = processLeaderboardData(usersData);

    // Creates HTML table to display user data
    let html = `
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Honor (Score)</th>
            <th>Clan</th>
            <th>Leaderboard Position</th>
          </tr>
        </thead>
        <tbody>
    `;

    // Loops through sortedUsers to create table rows
  sortedUsers.forEach((user, index) => {
  let rowClass = '';
  let medal = '';

  if (index === 0) {
    rowClass = 'gold';
    medal = '🥇';
  } else if (index === 1) {
    rowClass = 'silver';
    medal = '🥈';
  } else if (index === 2) {
    rowClass = 'bronze';
    medal = '🥉';
  }

  html += `
    <tr class="${rowClass}">
      <td>${index + 1} ${medal}</td>
      <td><a href="https://www.codewars.com/users/${user.username}" target="_blank">${user.username}</a></td>
      <td>${user.honor.toLocaleString()}</td>
      <td>${user.clan || '-'}</td>
      <td>${user.leaderboardPosition ?? '-'}</td>
    </tr>
  `;
});



    // Closes the table and shows it on the page
    html += '</tbody></table>';
    outputDiv.innerHTML = html;

  } catch (error) {
    outputDiv.textContent = `Error: ${error.message}`;
  }
});
