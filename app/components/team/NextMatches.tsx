
import { Card } from "@/components/ui/card";
import { slugById } from "@/utils/utils";
import Image from "next/image";

interface Props {
  matches: any;
}

const getCurrentWeek = (matchesData) => {
  const today = new Date();

  for (const match of matchesData) {
    const matchDate = new Date(match.matchDate);

    const formattedMatchDate = new Date(matchDate.toISOString());

    if (
      today >= formattedMatchDate &&
      today <= new Date(formattedMatchDate).setHours(23, 59, 59)
    ) {
      return match.week;
    }

    const allMatchesForWeek = matchesData.filter((m) => m.week === match.week);
    const allMatchesFinished = allMatchesForWeek.every(
      (m) => m.matchState === 7
    );

    if (allMatchesFinished) {
      const nextWeek = match.week + 1;
      return nextWeek;
    }
  }

  console.log("No matching week found, defaulting to week 1");
  return 1;
};

const NextMatches = ({ matches }: Props) => {
  const teamMatches = matches;
  

  const initialWeek = getCurrentWeek(matches);


  return (
    <div className=" ">
      {/* Display matches for the selected week */}
      {/* <pre className="text-center">
          {JSON.stringify(teamMatches, null, 2)}
        </pre> */}
      {matches &&
        matches
          .filter((match) => match.week === initialWeek)
          .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))
          .map((match) => (
            <div key={match.matchID}>
              <Card className="flex flex-col justify-between items-center w-[155px] h-full py-[6px] text-center rounded-md">
                <p className="text-[10px] uppercase font-medium text-center">
                  {new Date(match.matchDate).toLocaleDateString("es-EU", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="flex flex-row justify-between items-center text-center w-full px-[2px]">
                  <Image
                    src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                    alt="home"
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                    className="h-7 "
                  />
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex">
                      <p className="font-semibold">{match.localScore}</p>
                      <p className="mx-1">-</p>
                      <p className="font-semibold">{match.visitorScore}</p>
                    </div>
                  </div>
                  <Image
                    src={`/teamLogos/${slugById(match.visitorTeamID)}.png`}
                    alt="home"
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                    className="h-7 "
                  />
                </div>
                <p className="text-[11px] uppercase font-medium text-center">
                  {new Date(match.matchDate).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </Card>
            </div>
          ))}
    </div>
  );
};

export default NextMatches;
