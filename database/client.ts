import { Matches } from "@/types";
import { supabase } from "./supabase";

type Player = object;
type Stat = object;
type Team = object;



async function getAllPlayers(): Promise<{ allPlayers: Player[] }> {
  const { data: allPlayers } = await supabase
    .from("players")
    .select("*")
    .order("points", { ascending: false });
  return { allPlayers };
}

async function getPaginatedPlayers({
    teamID,
    playerName,
    page = 1,
    limit = 12,
  }: {
    teamID?: number;
    playerName?: string;
    page: number;
    limit: number;
  }): Promise<{ paginatedPlayers: Player[]; totalCount: number }> {
    //imitate delay
    
  
      let request = supabase.from("players").select("*");
  
      if (teamID !== undefined) {
        request = request.eq("teamID", teamID);
      }
  
      if (playerName) {
        request = request.ilike("nickname", `%${playerName}%`); // This filters the players by the name using ILIKE
      }
  
      const { data: paginatedPlayers, count } = await request
        .order("points", { ascending: false })
        .range(page * limit - limit, page * limit - 1);
  
      return { paginatedPlayers, totalCount: count };
    } 
  
  
  

async function getAllStats(): Promise<{ allStats: Stat[] }> {
  const { data: allStats } = await supabase
    .from("stats")
    .select("*")
    .order("week", { ascending: false });
  
  return { allStats };
}


async function getAllTeams(): Promise<{ allTeams: Team[] }> {
  const { data: allTeams } = await supabase.from("teams").select("*");
  return { allTeams };
}

async function getPlayerById(
  id: number
): Promise<{ player: Player | null; stats: Stat[] }> {
  let { data: playerData } = await supabase
    .from("players")
    .select("*")
    .eq("playerID", id);
  let { data: playerStat } = await supabase
    .from("stats")
    .select("*")
    .eq("playerID", id);

  let player: Player | null = null;
  let stats: Stat[] = [];

  if (playerData && playerData.length > 0) {
    player = playerData[0];
  }

  if (playerStat && playerStat.length > 0) {
    stats = playerStat;
  }

  return {
    player,
    stats,
  };
}

async function getTeamByTeamID(teamID) {
  if(!teamID) return { data: null, error: "No teamID provided"}
  const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('teamID', teamID)

  return { data, error };
}


async function getPlayersByTeamID(
  teamID: number
): Promise<{ data: Player[] | null; error: string | null }> {
  if (!teamID)
    return { data: null, error: "No teamID provided for getPlayersByTeamID" };
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("teamID", teamID);
  return { data, error };
}

async function getAllMatches(): Promise<{ allMatches: Matches[] }> {
  //imitate delay 
  // await new Promise((resolve) => setTimeout(resolve, 3000));
 

  const { data: allMatches } = await supabase
    .from("matches")
    .select("*")
    .order("matchID", { ascending: false });
  return { allMatches };

}


export {
  getAllPlayers,
  getAllStats,
  getAllTeams,
  getPlayerById,
  getTeamByTeamID,
  getPlayersByTeamID,
  getPaginatedPlayers,
  getAllMatches,
};
