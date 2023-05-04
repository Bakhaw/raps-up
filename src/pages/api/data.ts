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

export const initialCounter = 2; // seconds

export const initialGame: Game = {
  activePlayer: {
    name: "teamName1_playerName1",
  },
  activePlayerIndex: 0,
  activeTeam: {
    name: "teamName1",
    players: [
      {
        name: "teamName1_playerName1",
      },
    ],
  },
  activeTeamIndex: 0,
  activeTurn: 1,
  deck: initialDeck,
  round: 1,
  savedCards: [],
  scoreboard: {
    teamName1: 0,
    teamName2: 0,
    teamName3: 0,
  },
  teams: [
    {
      name: "teamName1",
      players: [
        {
          name: "teamName1_playerName1",
        },
        {
          name: "teamName1_playerName2",
        },
        {
          name: "teamName1_playerName3",
        },
      ],
    },
    {
      name: "teamName2",
      players: [
        {
          name: "teamName2_playerName1",
        },
        {
          name: "teamName2_playerName2",
        },
        {
          name: "teamName2_playerName3",
        },
      ],
    },
    {
      name: "teamName3",
      players: [
        {
          name: "teamName3_playerName1",
        },
        {
          name: "teamName3_playerName2",
        },
        {
          name: "teamName3_playerName3",
        },
      ],
    },
  ],
};
