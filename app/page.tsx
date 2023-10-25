import NewMarketDown from "@/components/market/NewMarketDown";
import NewMarketUp from "@/components/market/NewMarketUp";
import { Grid } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto p-4 max-w-6xl">
      <NewMarketUp />
      <NewMarketDown />
    </main>
  );
}
