"use client"

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
import { CommonInput } from "../common/input"

export const KnowledgeBasePreviewDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="uppercase rounded-full flex gap-1 items-center" variant="outline">
          AI Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Preview Knowledge Base</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="grid gap-4">
            <CommonInput text="Nickname" />
            <CommonInput text="Email" type="email" />
            <CommonInput text="Password" type="password" />
          </div>
          <div className="grid gap-4">
            <CommonInput text="API Key" />
            <CommonInput text="Project ID" />
            <CommonInput text="Set Expire Date" type="datetime-local" />
          </div>
        </div>
        <hr />
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