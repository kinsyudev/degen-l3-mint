import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { degenChain } from "~/config/chain";
import { siteMetadata } from "~/config/metadata";
import { env } from "~/env";

const metadata = {
  name: siteMetadata.name,
  description: siteMetadata.description,
  url: siteMetadata.url, // origin must match your domain & subdomain
  icons: [siteMetadata.icon],
};

// Create wagmiConfig
const chains = [degenChain] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId: env.NEXT_PUBLIC_WC_ID,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
