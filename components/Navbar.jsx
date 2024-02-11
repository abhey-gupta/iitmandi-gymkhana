"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const society_id = searchParams.get("society_id");
  const router = useRouter();

  return (
    <>
      {/* {!pathname === "/" && ( */}
      <nav className="bg-white shadow w-full flex flex-wrap items-center justify-between mx-auto mb-1">
        <Link href={"/"} className="flex items-center">
          <img
            src="https://wiki.iitmandi.co.in/images/0/04/Gymkhanad-01-removebg-preview.png"
            className="h-24 mr-3 aspect-video object-contain"
            alt="Gymkhana Logo"
          />
        </Link>

        {pathname === "/society" && (
          <div className="mr-5">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="secondary">Options</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuLabel>Society Authentications</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                  onClick={() => {
                    router.push(`/society/login?society_id=${society_id}`);
                  }}
                >
                  Log in as Society FA
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {pathname === "/" && (
          <div className="mr-5">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="secondary">Options</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuLabel>Society Authentications</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                {/* <DropdownMenuItem>
                  <Link href={`/chair-sap`}>Chair SAP Portal</Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <Link href={`/students-office`}>Students Office Portal</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </nav>
      {/* )} */}
    </>
  );
};

export default Navbar;
