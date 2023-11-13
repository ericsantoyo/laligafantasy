"use client";
import {
  getAllPlayers,
  getAllMatches,
  getAllStats,
  getTeamByTeamID,
  getPlayerById,
  // getPlayerById,
} from "@/database/client";

import Paper from "@mui/material/Paper";
import { supabase } from "@/database/supabase";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { LineChart } from "@mui/x-charts/LineChart";
import ValueChart from "@/app/components/player/ValueChart";

const formatter = new Intl.NumberFormat("en-GB", {});



export default async function Player({ params }) {
  const { player: fetchedPlayer, stats: fetchedStats } = await getPlayerById(
    params.playerID
  );
  // const { data: fetchedTeam } = await getTeamByTeamID(fetchedPlayer.teamID);
  // const team = fetchedTeam[0];

  

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card className="flex flex-col justify-center items-center">
        <Image
          src={fetchedPlayer.image}
          alt={fetchedPlayer.nickname}
          width={192}
          height={192}
          style={{ objectFit: "contain" }}
          className="h-48"
        />

        <h3 className="font-bold text-xl mx-auto	 ">{fetchedPlayer.nickname}</h3>
      </Card>
      <Card className="flex flex-col justify-center items-center p-2">
        <ValueChart fetchedPlayer={fetchedPlayer} />
      </Card>

      
    </div>
  );
}
