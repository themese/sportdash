import db from "../db/db";
import Match from "../interfaces/match";

const matches: Match[] = getMatchesFromDb();

function getMatchesFromDb(): Match[] {
  return db.map(str => {
    const teams = str.split(':')[0];
    const scores = str.split(':')[1];
    const match: Match = {
      homeTeam: teams.split('-')[0].trim(),
      homeScore: parseInt(scores.split('-')[0]),
      visitorTeam: teams.split('-')[1].trim(),
      visitorScore: parseInt(scores.split('-')[1]),
      isLive: false
    };
    return match;
  });
}

export function getMatches() {
  return matches;
}

export function addGoal(id: number, addToHomeTeam: boolean) {
  if (addToHomeTeam) {
    matches[id].homeScore++;
  } else {
    matches[id].visitorScore++;
  }
}