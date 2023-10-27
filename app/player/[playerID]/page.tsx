import {
  getAllPlayers,
  getAllMatches,
  getAllStats,
  getTeamByTeamID,
  // getPlayerById,
} from "@/database/client";
import TeamLayout from "@/components/team/TeamLayout";
import Paper from "@mui/material/Paper";
import { supabase } from "@/database/supabase";
import Image from "next/image";

const formatter = new Intl.NumberFormat("en-GB", {});

async function getPlayerById(id) {
  let { data: playerData } = await supabase
    .from("players")
    .select("*")
    .eq("playerID", id);

  let { data: playerStat } = await supabase
    .from("stats")
    .select("*")
    .eq("playerID", id);

  let player = null;
  let stats = [];
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

export default async function Player({ params }) {
  const { player: fetchedPlayer, stats: fetchedStats } = await getPlayerById(
    params.playerID
  );
  const { data: fetchedTeam } = await getTeamByTeamID(fetchedPlayer.teamID);
  const team = fetchedTeam[0];

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
     
        <Paper className="flex flex-col justify-center items-center">
          
          <Image
            src={fetchedPlayer.image}
            alt={fetchedPlayer.nickname}
            width={192}
            height={192}
            style={{ objectFit: "contain" }}
            className="h-48"
          />

          <h3 className="font-bold text-xl mx-auto	 ">
            {fetchedPlayer.nickname}
          </h3>
        </Paper>
    
    </div>
  );
}
