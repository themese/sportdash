import { addGoal, getMatches, removeGoal } from "../match.service"

test('transforms original db to db using interfaces', () => {
  const data = getMatches();
  const mexicoCanadaMatch = data[0];
  const uruguayItalyMatch = data[3];
  const usaChinaMatch = data[7];
  expect(data.length).toBe(9); // not the best test, but I wanted to make sure we are reading correctly the ts file
  expect(mexicoCanadaMatch.homeTeam).toBe('Mexico');
  expect(mexicoCanadaMatch.visitorTeam).toBe('Canada');
  expect(mexicoCanadaMatch.homeScore).toBe(0);
  expect(mexicoCanadaMatch.visitorScore).toBe(5);
  expect(mexicoCanadaMatch.isLive).toBe(true);
  expect(mexicoCanadaMatch.hasBeenPlayed).toBe(false);

  expect(uruguayItalyMatch.homeTeam).toBe('Uruguay');
  expect(uruguayItalyMatch.visitorTeam).toBe('Italy');
  expect(uruguayItalyMatch.homeScore).toBe(6);
  expect(uruguayItalyMatch.visitorScore).toBe(6);
  expect(uruguayItalyMatch.isLive).toBe(true);
  expect(uruguayItalyMatch.hasBeenPlayed).toBe(false);

  expect(usaChinaMatch.homeTeam).toBe('USA');
  expect(usaChinaMatch.visitorTeam).toBe('China');
  expect(usaChinaMatch.homeScore).toBe(0);
  expect(usaChinaMatch.visitorScore).toBe(0);
  expect(usaChinaMatch.isLive).toBe(false);
  expect(usaChinaMatch.hasBeenPlayed).toBe(false);
});

test('adds goals to spain-brazil', () => {
  const data = getMatches();
  const matchIndex = 1;
  const match = data[matchIndex];
  addGoal(matchIndex, false);

  expect(match.homeScore).toBe(10);
  expect(match.visitorScore).toBe(3);

  addGoal(matchIndex, false);

  expect(match.homeScore).toBe(10);
  expect(match.visitorScore).toBe(4);

  addGoal(matchIndex, true);
  addGoal(matchIndex, true);
  addGoal(matchIndex, false);
  addGoal(matchIndex, true);

  expect(match.homeScore).toBe(13);
  expect(match.visitorScore).toBe(5);
});

test('removes goals to Argentina - Australia', () => {
  const data = getMatches();
  const matchIndex = 4;
  const match = data[matchIndex];
  removeGoal(matchIndex, false);

  expect(match.homeScore).toBe(3);
  expect(match.visitorScore).toBe(0);

  // testing no negative goals
  removeGoal(matchIndex, false);
  expect(match.homeScore).toBe(3);
  expect(match.visitorScore).toBe(0);

  removeGoal(matchIndex, true);
  expect(match.homeScore).toBe(2);
  expect(match.visitorScore).toBe(0);

  removeGoal(matchIndex, true);
  removeGoal(matchIndex, false);
  removeGoal(matchIndex, true);
  removeGoal(matchIndex, true);
  removeGoal(matchIndex, true);
  expect(match.homeScore).toBe(0);
  expect(match.visitorScore).toBe(0);
});

test('adds goals and removes goals from multiple matches', async () => {
  const data = getMatches();
  const mexicoIndex = 0;
  const germanyIndex = 2;
  const swedenIndex = 6;
  const mexicoMatch = data[mexicoIndex];
  const germanyMatch = data[germanyIndex];
  const swedenMatch = data[swedenIndex];

  // #region test that we read everything correctly from the db
  expect(mexicoMatch.homeTeam).toBe('Mexico');
  expect(mexicoMatch.visitorTeam).toBe('Canada');
  expect(germanyMatch.homeTeam).toBe('Germany');
  expect(germanyMatch.visitorTeam).toBe('France');
  expect(swedenMatch.homeTeam).toBe('Sweden');
  expect(swedenMatch.visitorTeam).toBe('Denmark');
  expect(mexicoMatch.homeScore).toBe(0);
  expect(mexicoMatch.visitorScore).toBe(5);
  expect(germanyMatch.homeScore).toBe(2);
  expect(germanyMatch.visitorScore).toBe(2);
  expect(swedenMatch.homeScore).toBe(0);
  expect(swedenMatch.visitorScore).toBe(0);
  // #endregion

  // #region multiple goals to all matches - we are also testing async threads see line 115
  addGoal(mexicoIndex, true);
  removeGoal(mexicoIndex, false);
  removeGoal(mexicoIndex, false);
  removeGoal(mexicoIndex, false);
  removeGoal(mexicoIndex, false);
  addGoal(mexicoIndex, true);
  addGoal(mexicoIndex, true);
  addGoal(mexicoIndex, true);
  removeGoal(mexicoIndex, true);
  removeGoal(mexicoIndex, true);
  removeGoal(mexicoIndex, true);
  removeGoal(mexicoIndex, true);
  removeGoal(mexicoIndex, true);
  removeGoal(mexicoIndex, true);
  addGoal(germanyIndex, true);
  addGoal(germanyIndex, true);
  addGoal(germanyIndex, true);
  addGoal(germanyIndex, true);
  addGoal(mexicoIndex, false);
  addGoal(mexicoIndex, false);
  const promises = [];
  for (let i = 0; i < 40; i++) {
    promises.push(addGoal(swedenIndex, true));
    promises.push(addGoal(swedenIndex, false));
    promises.push(removeGoal(swedenIndex, false));
  }
  await Promise.all(promises);
  addGoal(mexicoIndex, false);
  addGoal(mexicoIndex, true);
  addGoal(mexicoIndex, true);
  removeGoal(mexicoIndex, true);
  addGoal(mexicoIndex, false);
  removeGoal(germanyIndex, true);
  addGoal(germanyIndex, false);
  addGoal(germanyIndex, false);
  removeGoal(germanyIndex, true);
  removeGoal(mexicoIndex, true);
  removeGoal(mexicoIndex, false);
  addGoal(mexicoIndex, true);
  removeGoal(mexicoIndex, true);
  addGoal(mexicoIndex, true);
  removeGoal(mexicoIndex, false);
  addGoal(mexicoIndex, true);
  removeGoal(germanyIndex, false);
  removeGoal(mexicoIndex, true);
  // #endregion

  // #region test after goal changed
  expect(mexicoMatch.homeScore).toBe(1);
  expect(mexicoMatch.visitorScore).toBe(3);
  expect(germanyMatch.homeScore).toBe(4);
  expect(germanyMatch.visitorScore).toBe(3);
  expect(swedenMatch.homeScore).toBe(40);
  expect(swedenMatch.visitorScore).toBe(0);
  // #endregion
});