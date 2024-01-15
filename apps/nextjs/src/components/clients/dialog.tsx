"use client"

import { PlusIcon } from "@radix-ui/react-icons"
import { Button } from "@acme/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog"
import { Label } from "@acme/ui/label"
import { ClientInput } from "./input"
import { ClientSwitch } from "./switch"

export const ClientDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="uppercase rounded-full flex gap-1 items-center">
          <PlusIcon className="w-4 h-4" />
          New Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Register Client</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="grid gap-4">
            <ClientInput text="Nickname" />
            <ClientInput text="Email" type="email" />
            <ClientInput text="Password" type="password" />
          </div>
          <div className="grid gap-4">
            <ClientInput text="API Key" />
            <ClientInput text="Project ID" />
            <ClientInput text="Set Expire Date" type="datetime-local" />
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <Label htmlFor="features">Enable Features</Label>
          <div id="features" className="flex justify-between px-8">
            <ClientSwitch text="Analytics" />
            <ClientSwitch text="Transcripts" />
            <ClientSwitch text="Knowledge Base" />
            <ClientSwitch text="Tags" />
            <ClientSwitch text="FAQ" />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="rounded-full">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" className="rounded-full">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}