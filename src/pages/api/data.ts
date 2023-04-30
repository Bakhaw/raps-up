import { Game } from "@/types";

const initialDeck = [
  {
    chunks: ["damso", "nekfeu"],
  },
  {
    chunks: ["vald", "drake"],
  },
  {
    chunks: ["lithopédion", "l'Olympia"],
  },
  {
    chunks: ["hamza", "travis scott"],
  },
  {
    chunks: ["ikaz boi", "bbp"],
  },
  {
    chunks: ["50 000 ventes", "single"],
  },
  {
    chunks: ["trente-quatre-centimes", "667"],
  },
];

export const initialState: Game = {
  deck: initialDeck,
  currentTeam: "teamName1",
  round: 1,
  savedCards: [],
  scoreboard: {
    teamName1: 0,
    teamName2: 0,
    teamName3: 0,
  },
  nextTeams: ["teamName2", "teamName3", "teamName1"], // teamName1 is currently playing, teamName2 is next
  teams: [
    {
      name: "teamName1",
      players: [
        {
          name: "playerName1",
        },
      ],
    },
    {
      name: "teamName2",
      players: [
        {
          name: "playerName2",
        },
      ],
    },
    {
      name: "teamName3",
      players: [
        {
          name: "playerName3",
        },
      ],
    },
  ],
};
