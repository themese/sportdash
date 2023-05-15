import db from "../db/db";
import Match from "../interfaces/match";

const matches: Match[] = getMatchesFromDb();

function getMatchesFromDb(): Match[] {
  return db.map((str, index) => {
    const teams = str.split(':')[0];
    const scores = str.split(':')[1];
    const match: Match = {
      homeTeam: teams.split('-')[0].trim(),
      homeScore: parseInt(scores.split('-')[0]),
      visitorTeam: teams.split('-')[1].trim(),
      visitorScore: parseInt(scores.split('-')[1]),
      hasBeenPlayed: index === 8 ? true : false, // set one match as if it was already completed
      isLive: index <= 4 ? true : false, // from Mexico match to Argentina match, set them as live for demo purposes
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

// I don't like VAR but it exists so we should consider it
export function removeGoal(id: number, removeFromHomeTeam: boolean) {
  if (removeFromHomeTeam) {
    matches[id].homeScore !== 0 ? matches[id].homeScore-- : matches[id].homeScore = 0;
  } else {
    matches[id].visitorScore !== 0 ? matches[id].visitorScore-- : matches[id].visitorScore = 0;
  }
}

export function startMatch(id: number) {
  const match = matches[id];
  if (match) {
    match.isLive = true;
    match.hasBeenPlayed = false;
  }
}

export function endMatch(id: number) {
  const match = matches[id];
  if (match) {
    match.isLive = false;
    match.hasBeenPlayed = true;
  }
}