
import Paper from "@mui/material/Paper";

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

const TeamLayout: React.FC<TeamLayoutProps> = ({ playersWithStats }) => {
  return (
    <div>
      <h1>Team Page</h1>
      <div className="container grid grid-cols-3 gap-3">
      {playersWithStats.map((player, index) => (
        <Paper elevation={3} key={index}>
          <h2>{player.nickname}</h2>
          <p>Position: {player.position}</p>
          
          
        </Paper>
      ))}
      </div>
    </div>
  );
};

export default TeamLayout;
