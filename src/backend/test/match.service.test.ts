import { addGoal, getMatches, removeGoal } from "../match.service"

test('transforms original db to db using interfaces', () => {
  const data = getMatches();
  const mexicoCanadaMatch = data[0];
  const uruguayItalyMatch = data[3];
  expect(data.length).toBe(9); // not the best test, but I wanted to make sure we are reading correctly the ts file
  expect(mexicoCanadaMatch.homeTeam).toBe('Mexico');
  expect(mexicoCanadaMatch.visitorTeam).toBe('Canada');
  expect(mexicoCanadaMatch.homeScore).toBe(0);
  expect(mexicoCanadaMatch.visitorScore).toBe(5);

  expect(uruguayItalyMatch.homeTeam).toBe('Uruguay');
  expect(uruguayItalyMatch.visitorTeam).toBe('Italy');
  expect(uruguayItalyMatch.homeScore).toBe(6);
  expect(uruguayItalyMatch.visitorScore).toBe(6);
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