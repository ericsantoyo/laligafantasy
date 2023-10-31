import { supabase } from "@/database/supabase";
import { Matches } from "@/types";


const getAllMatches = async (url: string): Promise<{ allMatches: Matches[] }> => {
  const { data: allMatches } = await supabase
    .from("matches")
    .select("*")
    .order("matchID", { ascending: false });

  return { allMatches };
};