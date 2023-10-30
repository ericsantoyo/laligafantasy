
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Link from "next/link";

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

interface TeamLayoutProps {
  playersWithStats: PlayerWithStats[];
}

const TeamLayout: React.FC<TeamLayoutProps> = ({ allPlayersData }) => {
  return (
    <div>
    
      <div className=" grid grid-cols-3 gap-3">
      {allPlayersData.map((player, index) => (
        <Link href={`/player/${player.playerID}`} key={index}>
        <Paper elevation={3}>
          <Image
            src={player.image}
            alt={player.name}
            width={48}
            height={48}
            className="w-12 h-12 "
          />
          <h2>{player.nickname}</h2>
          <p>Position: {player.position}</p>
          
          
        </Paper>
        </Link>
      ))}

      </div>
    </div>
  );
};

export default TeamLayout;
