// apps/pi-dashboard/app/layout.tsx – global layout with dark mode & glassmorphism
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
    title: "Pi Dashboard – Agentic Software Factory",
    description: "Control the EM‑Dash migration pipeline with zero‑human bottlenecks.",
};
export default function RootLayout({ children }) {
    return (<html lang="en" className="dark">
      <body className={`${inter.className} app-body`}>
        <header className="app-header">
          <h1>Pi Dashboard</h1>
        </header>
        <main className="app-main">{children}</main>
        <footer className="app-footer">
          © {new Date().getFullYear()} Akash Software Factory – All agents at work.
        </footer>
      </body>
    </html>);
}
