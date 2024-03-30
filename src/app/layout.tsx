import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { siteMetadata } from "~/config/metadata";
import type { Metadata } from "next";
import { cookieToInitialState } from "wagmi";
import { config } from "~/config/web3";
import { headers } from "next/headers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: siteMetadata.name,
  description: siteMetadata.description,
  icons: [{ rel: "icon", url: siteMetadata.icon }],
} satisfies Metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>{children}</body>
    </html>
  );
}
