import { Github, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Header() {
  return (
    <header className="grid-cols-auto z-10 grid w-full items-center gap-y-2 md:grid-cols-[1fr_auto]">
      <h1 className="h-fit text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
        dMint
      </h1>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <Link
            href="https://github.com/kinsyudev/degen-l3-mint"
            target="_blank"
          >
            <Button variant="outline" size="icon">
              <Github className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="https://twitter.com/kinsyudev" target="_blank">
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <w3m-button />
      </div>
    </header>
  );
}
