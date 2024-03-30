import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { siteMetadata } from "~/config/metadata";
import type { Metadata } from "next";
import { cookieToInitialState } from "wagmi";
import { config } from "~/config/web3";
import { headers } from "next/headers";
import banner from "~/media/ktools.png";
import Header from "~/components/header";
import { Toaster } from "~/components/ui/toaster";
import { BackgroundBeams } from "~/components/background-beams";
import ClientLayout from "~/app/client-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: siteMetadata.name,
  description: siteMetadata.description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    url: siteMetadata.url,
    type: "website",
    images: {
      url: banner.src,
      type: "image/png",
      width: banner.width,
      height: banner.height,
      alt: siteMetadata.name,
    },
    siteName: siteMetadata.name,
    title: siteMetadata.name,
    description: siteMetadata.description,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kinsyudev",
    description: siteMetadata.description,
    title: siteMetadata.name,
    images: {
      url: banner.src,
      alt: siteMetadata.name,
      width: banner.width,
      height: banner.height,
    },
    site: siteMetadata.url,
  },
  creator: "@kinsyudev",
} satisfies Metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <ClientLayout initialState={initialState}>
          <div className="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr] items-center justify-center justify-items-center gap-4 px-4 py-8 text-black">
            <Header />
            {children}
          </div>
          <BackgroundBeams />
          <Toaster />
        </ClientLayout>
      </body>
    </html>
  );
}
