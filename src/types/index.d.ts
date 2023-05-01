interface Team {
  name: string;
  players: Player[];
}

interface Player {
  name: string;
}

interface Score {
  [teamName: string]: number;
}

export interface Game {
  activeTeam: Team["name"];
  deck: CardProps[];
  nextTeams: Team["name"][];
  round: number;
  savedCards: CardProps | null;
  scoreboard: Score;
  teams: Team[];
}
