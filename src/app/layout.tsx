import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import Title from "./_components/title";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Racoes de Passaro",
  description: ":D :D",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-gradient-to-b from-[#2e026d] to-[#15162c]`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Title />

          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
