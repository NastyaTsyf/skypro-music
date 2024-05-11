import Sidebar from "@/components/Sidebar/Sidebar";
import Navigation from "@/components/Navigation/Navigation";
import Centerblock from "@/components/Centerblock/Centerblock";
import Bar from "@/components/Bar/Bar";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Navigation />
          <Centerblock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer" />
      </div>
    </div>
  );
}
