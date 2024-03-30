import { Github, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Header() {
  return (
    <div className="flex w-full flex-col gap-2">
      <header className="grid w-full grid-cols-[1fr_auto] items-center">
        <h1 className="h-fit text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
          kTools
        </h1>
        <div className="flex gap-2">
          <Link href="https://github.com/kinsyudev/web3-tools" target="_blank">
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
      </header>
    </div>
  );
}
