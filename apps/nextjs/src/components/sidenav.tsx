"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRightIcon, ChevronLeftIcon, PersonIcon, GearIcon, ExitIcon } from "@radix-ui/react-icons"

import { Button } from "@acme/ui/button";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/auth/actions";

export const SideNav = () => {
  const pathname = usePathname();
  const [collapse, setCollapse] = useState(false);

  return (
    <aside className={`${collapse ? "w-20" : "w-60"} h-screen border-dashed border-r border-primary/80 px-4 py-8 flex flex-col justify-between relative`}>
      <Button className="absolute rounded-full border-dashed border border-primary/80 w-5 h-5 top-10 -right-2.5" variant="outline" size="icon" onClick={() => setCollapse(prev => !prev)}>
        {
          collapse ? <ChevronRightIcon className="h-3 w-3" /> : <ChevronLeftIcon className="h-3 w-3" />
        }
      </Button>

      <div className="flex flex-col gap-4">
        <Link className="text-nowrap" href="/">Client Portal</Link>
        <h5 className="uppercase text-nowrap text-sm font-semibold">Agency Dashboard</h5>
        <div className="flex flex-col text-md font-medium gap-2">
          <Link className={`${pathname === "/clients" ? "bg-muted" : ""} flex items-center gap-2 p-3 rounded-lg hover:bg-muted h-10`} href="/clients">
            <PersonIcon className="h-5 w-5" />
            <p>Clients</p>
          </Link>
          <Link className="inline-flex items-center gap-2 p-3 rounded-lg hover:bg-muted h-10" href="/account">
            <GearIcon className="h-5 w-5" />
            <p>Account Settings</p>
          </Link>
        </div>
      </div>
      <div>
        <hr className="py-1" />
        <Button
          className="inline-flex justify-start gap-2 p-3 rounded-lg w-full text-md h-10"
          variant="ghost"
          onClick={() => signOut()}
        >
          <ExitIcon className="h-5 w-5" />
          <p>Log Out</p>
        </Button>
      </div>
    </aside>
  );
};