import {
  getAllStats,
  getAllTeams,
  getPaginatedPlayers,
} from "@/database/client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import SearchFilters from "@/app/components/stats/SearchFilters"
import { slugById } from "@/utils/utils";
import MatchesPage from "../components/RightGameSheet";

type Props = {};


//To format the value
const formatter = new Intl.NumberFormat("en-GB", {});

//To get the teamSlugs by teamID


NewsPage.defaultProps = {
  searchParams: {
    page: "1",
    limit: "12",
    search: "",
    team: "",
  },
};

export default async function NewsPage({searchParams,}: {searchParams: { [key: string]: string | string[] | undefined };}) {
  
 

  return (
    <div className="flex flex-col justify-center px-4 w-full">
      <MatchesPage />

    </div>
  );
}
