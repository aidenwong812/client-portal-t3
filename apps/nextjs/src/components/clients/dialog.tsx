"use client"

import React, { useEffect } from "react"
import { Button } from "@acme/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@acme/ui/dialog"
import { Label } from "@acme/ui/label"
import { api } from "@/trpc/react"
import { CommonInput } from "../common/input"
import { ClientSwitch } from "./switch"

type Client = {
  id: string,
  name: string,
  clientEmail: string,
  password: string,
  projectId: string,
  apiKey: string,
  analytics: boolean,
  transcripts: boolean,
  knowledgeBase: boolean,
  tags: boolean,
  faq: boolean,
}

type Props = {
  open: boolean,
  setOpen: (open: boolean) => void,
  initialData?: Client
}

export const ClientDialog = ({ open, setOpen, initialData }: Props) => {
  const [client, setClient] = React.useState({
    id: "",
    name: "",
    clientEmail: "",
    password: "",
    apiKey: "",
    projectId: "",
    analytics: true,
    transcripts: false,
    knowledgeBase: true,
    tags: false,
    faq: false,
  })

  useEffect(() => {
    if (initialData) {
      setClient(initialData)
    }
  }, [initialData])

  // const selectedClient = api.assistant.byClientId.useQuery({ id: clientId }, {
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // })

  const createAssitant = api.assistant.create.useMutation({
    // onSettled: () => clients.refetch()
  })

  const updateAssitant = api.assistant.update.useMutation({})

  const handleChange = (updateType: string, value: string) => {
    setClient({ ...client, [updateType]: value })
  }

  const handleChangeFeature = async (updateType: string, value: boolean) => {
    setClient({ ...client, [updateType]: value })
  }

  const handleSave = async () => {
    if (client.id === "")
      await createAssitant.mutateAsync(client)
    else
      await updateAssitant.mutateAsync(client)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Register Client</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <CommonInput text="Username" defaultValue={client.name} updateType="name" updateValue={handleChange} />
          <CommonInput text="Email" type="email" defaultValue={client.clientEmail} updateType="clientEmail" updateValue={handleChange} />
          <CommonInput text="Password" type="password" defaultValue={client.password} updateType="password" updateValue={handleChange} />
          <CommonInput text="API Key" defaultValue={client.apiKey} updateType="apiKey" updateValue={handleChange} />
          <CommonInput text="Project ID" defaultValue={client.projectId} updateType="projectId" updateValue={handleChange} />
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <Label htmlFor="features">Enable Features</Label>
          <div id="features" className="flex justify-between px-8">
            <ClientSwitch text="Analytics" updateType="analytics" defaultValue={client.analytics} updateValue={handleChangeFeature} />
            <ClientSwitch text="Transcripts" updateType="transcripts" defaultValue={client.transcripts} updateValue={handleChangeFeature} />
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