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
  activePlayer: Player;
  activePlayerIndex: number;
  activeTeam: Team;
  activeTeamIndex: number;
  activeTurn: number;
  deck: CardProps[];
  round: number;
  savedCards: CardProps | null;
  scoreboard: Score;
  teams: Team[];
}
