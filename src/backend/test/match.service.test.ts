import { addGoal, getMatches } from "../match.service"

test('transforms original db to db using interfaces', () => {
  const data = getMatches();
  const mexicoCanadaMatch = data[0];
  const uruguayItalyMatch = data[3];
  expect(data.length).toBe(5);
  expect(mexicoCanadaMatch.homeTeam).toBe('Mexico');
  expect(mexicoCanadaMatch.visitorTeam).toBe('Canada');
  expect(mexicoCanadaMatch.homeScore).toBe(0);
  expect(mexicoCanadaMatch.visitorScore).toBe(5);

  expect(uruguayItalyMatch.homeTeam).toBe('Uruguay');
  expect(uruguayItalyMatch.visitorTeam).toBe('Italy');
  expect(uruguayItalyMatch.homeScore).toBe(6);
  expect(uruguayItalyMatch.visitorScore).toBe(6);
});

test('adds scores to spain-brazil', () => {
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