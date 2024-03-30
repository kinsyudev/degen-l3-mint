"use client";

import { Copy, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import {
  type BaseError,
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
  useBalance,
} from "wagmi";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { ToastAction } from "~/components/ui/toast";
import { useToast } from "~/components/ui/use-toast";
import { degenChain } from "~/config/chain";
import { cn } from "~/lib/utils";

const abi = [
  {
    name: "mintTo",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ type: "address" }],
    outputs: [],
  },
] as const;

const nftAddress = "0x41dd68E07bD8bdd44c9E00b69891a39c6106162d";

export default function Mint() {
  const { address } = useAccount();
  const { toast } = useToast();

  const balance = useBalance({
    address: address,
  });

  const hasEnoughBalance = useMemo(
    () => balance.data && balance.data.value > 0n,
    [balance.data],
  );
  console.log(balance);
  const {
    data: hash,
    isPending,
    writeContract,
    error,
  } = useWriteContract({
    mutation: {
      onError(error) {
        toast({
          variant: "destructive",
          title: "Error minting",
          description: (error as BaseError).shortMessage || error.message,
          action: (
            <ToastAction
              altText="Copy error"
              onClick={() => {
                void navigator.clipboard.writeText(error.message);
              }}
            >
              <Copy className="h-4 w-4" />
            </ToastAction>
          ),
        });
      },
      onSuccess(data) {
        toast({
          title: "Mint Submitted",
          description: "Transaction submitted, plase wait for confirmation...",
          action: (
            <ToastAction altText="Navigate to transaction" asChild>
              <a href={`${degenChain.blockExplorers.default.url}/tx/${data}`}>
                <ExternalLink className="h-4 w-4" />
              </a>
            </ToastAction>
          ),
        });
      },
    },
  });

  const { isLoading: isConfirming, status } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMint = useCallback(() => {
    writeContract({
      abi: abi,
      address: nftAddress,
      functionName: "mintTo",
      args: [address!],
    });
  }, [address, writeContract]);

  useEffect(() => {
    if (!isConfirming) {
      toast({
        variant: status === "error" ? "destructive" : "default",
        title: "Mint Confirmed",
        description:
          status === "error"
            ? "Minting failed, please try again."
            : "Minting succesful!",
        action: (
          <ToastAction altText="Navigate to transaction" asChild>
            <a href={`${degenChain.blockExplorers.default.url}/tx/${hash}`}>
              <ExternalLink className="h-4 w-4" />
            </a>
          </ToastAction>
        ),
      });
    }
  }, [hash, isConfirming, status]);

  console.log("isPending", isPending);
  return (
    <Card className="bg-white/10 backdrop-blur-sm max-w-sm">
      <CardHeader>
        <CardTitle>Mint NFT</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        Mint the first NFT in Degen Chain!
        <Button
          disabled={isPending || !hasEnoughBalance}
          onClick={handleMint}
          className={cn("w-full")}
        >
          {isPending ? "Confirming..." : "Mint"}
        </Button>
        {!hasEnoughBalance && (
          <p className="text-red-400">
            <b>Insufficient balance:</b> You need some gas to mint an
            NFT.
          </p>
        )}
        {error && (
          <p className="text-red-400">
            <b>Error:</b> {(error as BaseError).shortMessage || error.message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
