'use client'

import Sidebar from "@/components/Sidebar/Sidebar";
import Navigation from "@/components/Navigation/Navigation";
import Centerblock from "@/components/Centerblock/Centerblock";
import Bar from "@/components/Bar/Bar";
import { useState } from "react";
import { trackType } from "@/types";

export default function Home() {

  const [track, setTrack] = useState<trackType | null>(null)

  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Navigation />
          <Centerblock setTrack={setTrack} />
          <Sidebar />
        </main>
        {track && (<Bar track={track} />)}
        <footer className="footer" />
      </div>
    </div>
  );
}
