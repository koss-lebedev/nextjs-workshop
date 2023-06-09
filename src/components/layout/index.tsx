import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex overflow-hidden bg-white">
          <Sidebar />
          <main className="h-full w-full min-h-screen bg-slate-50 relative overflow-y-auto ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export { RootLayout };
