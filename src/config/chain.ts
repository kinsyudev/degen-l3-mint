import { defineChain } from "viem";

export const degenChain = defineChain({
  id: 666666666,
  name: "Degen Chain",
  nativeCurrency: {
    decimals: 18,
    symbol: "DEGEN",
    name: "DEGEN",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.degen.tips"],
    },
  },
  blockExplorers: {
    default: {
      name: "Degen Chain Explorer",
      url: "https://explorer.degen.tips",
      apiUrl: "https://explorer.degen.tips/api/v2/",
    },
  },
});
