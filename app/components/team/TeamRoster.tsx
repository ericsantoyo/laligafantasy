import { Card } from "@/components/ui/card";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Link from "next/link";
import {
  getColor,
  formatDate,
  formatMoney,
  getWeeksTotalPointsFromStats,
  lastChangeStyle,
  formatter,
  getPositionBadge,
} from "@/utils/utils";
import { ChevronsDown, ChevronsUp } from "lucide-react";

interface PlayerStats {
  statType: string;
  value: number;
}

interface PlayerWithStats {
  playerData: {
    playerID: string;
    name: string;
    position: string;
  };
  stats: PlayerStats[];
}

interface TeamRosterProps {
  teamPlayers: any;
  playerStats: PlayerWithStats[];
}

const TeamRoster: React.FC<TeamRosterProps> = ({
  teamPlayers,
  playerStats,
}) => {
  return (
    <>
      <div className=" flex flex-col justify-start ">
        <Card className="py-2 border-none shadow-none flex flex-row justify-between items-center px-2 text-xs md:text-sm font-medium">
          <div className="flex flex-row justify-center items-center ml-2 md:w-36 w-[120px] flex-none">
            <p className="">Jugador</p>
          </div>
          <p className="hidden md:flex flex-1 justify-center text-center	 mx-2 ">
            Posicion
          </p>
          <p className="hidden md:flex flex-1 justify-center text-center	 mx-2 ">
            Puntos
          </p>
          <p className="hidden md:flex flex-1 justify-center text-center	 mx-2 ">
            Valor
          </p>

          <div className="flex flex-row justify-end mx-4 flex-1 text-end ">
            <ChevronsDown
              size={16}
              className="mr-2 text-red-500 dark:text-red-400 "
            />
            <ChevronsUp
              size={16}
              className="text-green-600 dark:text-green-400 mr-2"
            />
          </div>

          <div className="flex flex-row justify-center items-center w-[140px]">
            <div className="text-center ">Últimas Jornadas</div>
          </div>
        </Card>
        {teamPlayers.map((player, index) => (
          <Link href={`/player/${player.playerID}`} key={index}>
            <Card className="rounded-none flex flex-row  items-center px-2 text-xs md:text-sm ">
              <div className="flex flex-row justify-start items-center flex-none">
                <Image
                  src={player.image}
                  alt={player.name}
                  width={48}
                  height={48}
                  className=" w-12 h-12"
                />
                <div className="flex flex-col flex-1 ml-2">
                  <p className="w-18 md:w-24 ">{player.nickname}</p>
                  <div
                    className={`md:hidden font-base text-[10px] text-start `}
                  >
                    {formatter.format(player.marketValue)}
                  </div>
                </div>
              </div>
              <div className="hidden md:flex flex-1 justify-center text-center	 mx-2 ">
                <div className={getPositionBadge(player.positionID).className}>
                  {getPositionBadge(player.positionID).abbreviation}
                </div>
              </div>
              <p className="hidden md:flex flex-1 justify-center text-center	 mx-2 ">
                {player.points}
              </p>
              <p className="hidden md:flex flex-1 justify-center text-center	 mx-2 ">
                {formatter.format(player.marketValue)}
              </p>

              <div className="flex flex-col flex-1">
                <div
                  className={`font-semibold  text-end	 mx-4 ${lastChangeStyle(
                    player.lastMarketChange
                  )}`}
                >
                  {formatter.format(player.lastMarketChange)}
                </div>
                {/* <div
                  className={`md:hidden font-base text-[10px] text-end	 mx-4 `}
                >
                  {formatter.format(player.marketValue)}
                </div> */}
              </div>
              <div className="flex flex-row items-center gap-x-1 w-[140px]">
                {getWeeksTotalPointsFromStats(
                  player.playerID,
                  playerStats,
                  6
                ).map((point) => (
                  <div
                    className="flex flex-col justify-center items-center "
                    key={point.week}
                  >
                    <div
                      className={`text-center border-[0.5px] w-5 h-5 border-neutral-700   rounded-sm  flex justify-center items-center ${getColor(
                        point.points
                      )}`}
                    >
                      <p className={`text-[12px] items-center align-middle`}>
                        {point.points}
                      </p>
                    </div>
                    <div className="text-center text-[11px]">J{point.week}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default TeamRoster;
