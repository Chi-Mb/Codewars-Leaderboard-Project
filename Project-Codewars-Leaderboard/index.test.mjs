import test from 'node:test';
import assert from 'node:assert';
import nock from 'nock';
import { getUserData, processLeaderboardData } from './logic.mjs';

test('getUserData fetches user data from Codewars API', async () => {
  const mockUser = { username: 'exampleUser', honor: 1234 };
  
  const scope = nock('https://www.codewars.com')
    .get('/api/v1/users/exampleUser')
    .reply(200, mockUser);

  const data = await getUserData('exampleUser');
  assert.deepStrictEqual(data, mockUser);
  assert(scope.isDone());
});

test('processLeaderboardData sorts users by honor descending', () => {
  const users = [
    { username: 'a', honor: 100 },
    { username: 'b', honor: 300 },
    { username: 'c', honor: 200 },
  ];

  const sorted = processLeaderboardData(users);
  assert.strictEqual(sorted[0].username, 'b');
  assert.strictEqual(sorted[1].username, 'c');
  assert.strictEqual(sorted[2].username, 'a');
});
