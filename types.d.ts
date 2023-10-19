import { type } from "os";

export type Player = {
  playerID: number;
  name: string;
  nickname?: string;
  position: string;
  status: string;
  positionID: number;
  averagePoints: number;
  marketValue: number;
  teamID: number;
  image: string;
  points: number;
  marketValues: Array<{
    lfpId: number;
    marketValue: number;
    date: string;
    bids: number;
  }>;
  lastMarketChange: number;
  previousMarketValue: number;
  teamName: string;
  stats?: PlayerStats[];
};

export type Team = {
  teamID: number;
  name: string;
  nickname?: string;
  image: string;
  
};

export type Match = {
  matchID: number;
  homeTeamID: number;
  awayTeamID: number;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamScore: number;
  awayTeamScore: number;
  date: string;
  status: string;
  round: number;
  homeTeamImage: string;
  awayTeamImage: string;
};

export type PlayerStats = {
  playerID: number;
  ball_recovery: [number, number];
  effective_clearance: [number, number];
  goal_assist: [number, number];
  goals: [number, number];
  goals_conceded: [number, number];
  isInIdealFormation: boolean;
  marca_points: [number, number];
  mins_played: [number, number];
  offtarget_att_assist: [number, number];
  own_goals: [number, number];
  pen_area_entries: [number, number];
  penalty_conceded: [number, number];
  penalty_failed: [number, number];
  penalty_save: [number, number];
  penalty_won: [number, number];
  poss_lost_all: [number, number];
  red_card: [number, number];
  saves: [number, number];
  second_yellow_card: [number, number];
  totalPoints: number;
  total_scoring_att: [number, number];
  week: number;
  won_contest: [number, number];
  yellow_card: [number, number];
};
