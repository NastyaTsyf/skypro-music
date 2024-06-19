import Bar from "@/components/Bar/Bar";
import Navigation from "@/components/Navigation/Navigation";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function TrackLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="wrapper">
            <div className="container">
                <main className="main">
                    <Navigation />
                    {children}
                    <Sidebar />
                </main>
                <Bar />
                <footer className="footer" />
            </div>
        </div>
    )

}