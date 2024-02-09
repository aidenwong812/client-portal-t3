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
import { api } from "@/trpc/react"
import { CommonInput } from "../common/input"
import { ClientSwitch } from "./switch"

export const ClientDialog = () => {
  const [client, setClient] = React.useState({
    name: "",
    email: "",
    password: "",
    apiKey: "",
    projectId: "",
    analytics: true,
    transcript: false,
    knowledgeBase: true,
    tags: false,
    faq: false,
  })
  const [open, setOpen] = React.useState(false)

  // const clients = api.assistant.byClientId.useQuery(undefined, {
  //   initialData: initialClients,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // })

  const createAssitant = api.assistant.create.useMutation({
    // onSettled: () => clients.refetch()
  })

  const handleChange = (updateType: string, value: string) => {
    setClient({ ...client, [updateType]: value })
  }

  const handleChangeFeature = async (updateType: string, value: boolean) => {
    setClient({ ...client, [updateType]: value })
  }

  const handleSave = async () => {
    await createAssitant.mutateAsync(client)
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
          <CommonInput text="Nickname" defaultValue={client.name} updateType="name" updateValue={handleChange} />
          <CommonInput text="Email" type="email" defaultValue={client.email} updateType="email" updateValue={handleChange} />
          <CommonInput text="Password" type="password" defaultValue={client.password} updateType="password" updateValue={handleChange} />
          <CommonInput text="API Key" defaultValue={client.apiKey} updateType="apiKey" updateValue={handleChange} />
          <CommonInput text="Project ID" defaultValue={client.projectId} updateType="projectId" updateValue={handleChange} />
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <Label htmlFor="features">Enable Features</Label>
          <div id="features" className="flex justify-between px-8">
            <ClientSwitch text="Analytics" updateType="analytics" defaultValue={client.analytics} updateValue={handleChangeFeature} />
            <ClientSwitch text="Transcripts" updateType="transcript" defaultValue={client.transcript} updateValue={handleChangeFeature} />
            <ClientSwitch text="Knowledge Base" updateType="knowledgeBase" defaultValue={client.knowledgeBase} updateValue={handleChangeFeature} />
            <ClientSwitch text="Tags" updateType="tags" defaultValue={client.tags} updateValue={handleChangeFeature} />
            <ClientSwitch text="FAQ" updateType="faq" defaultValue={client.faq} updateValue={handleChangeFeature} />
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