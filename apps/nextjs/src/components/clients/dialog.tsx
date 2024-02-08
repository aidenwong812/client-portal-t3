"use client"

import React from "react"
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
import { CommonInput } from "../common/input"
import { ClientSwitch } from "./switch"
import { saveAssistant } from "./action"
import { api } from "@/trpc/react"

export const ClientDialog = () => {
  const [client, setClient] = React.useState({
    nickname: "",
    email: "",
    password: "",
    apiKey: "",
    projectId: "",
  })
  const [open, setOpen] = React.useState(false)

  const handleChange = (updateType: string, value: string) => {
    setClient({ ...client, [updateType]: value })
  }

  const handleSave = () => {
    api
    saveAssistant(client)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
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
          <CommonInput text="Nickname" defaultValue={client.nickname} updateType="nickname" updateValue={handleChange} />
          <CommonInput text="Email" type="email" defaultValue={client.email} updateType="email" updateValue={handleChange} />
          <CommonInput text="Password" type="password" defaultValue={client.password} updateType="password" updateValue={handleChange} />
          <CommonInput text="API Key" defaultValue={client.apiKey} updateType="apiKey" updateValue={handleChange} />
          <CommonInput text="Project ID" defaultValue={client.projectId} updateType="projectId" updateValue={handleChange} />
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
          <Button
            type="submit"
            className="rounded-full"
            onClick={handleSave}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}