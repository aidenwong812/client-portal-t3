"use client"

import React from "react"
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@acme/ui/card"
import { Input } from "@acme/ui/input"
import { ClientTable } from "@/components/clients/table"
import { ClientDialog } from "@/components/clients/dialog"
import { getClient } from "./action"
import { Button } from "@acme/ui/button"

export const Content = ({ initialData }: {
  initialData: {
    id: string,
    name: string,
    apiKey: string,
    analytics: boolean,
    transcripts: boolean,
    knowledgeBase: boolean,
    tags: boolean,
    faq: boolean,
    clientEmail: string,
    userId: string,
  }[]
}) => {
  const [open, setOpen] = React.useState(false)
  const [selectedClient, setSelectedClient] = React.useState({
    id: "",
    name: "",
    clientEmail: "",
    apiKey: "",
    password: "",
    projectId: "",
    analytics: true,
    transcripts: false,
    knowledgeBase: true,
    tags: false,
    faq: false,
  })

  const handleEdit = async (id: string) => {
    const data = await getClient(id)
    if (data)
      setSelectedClient(data)
    setOpen(true)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 px-12 py-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Client Management</h2>
        <div className="flex items-center space-x-2">
          <Button
            className="uppercase rounded-full flex gap-1 items-center"
            onClick={() => {
              setSelectedClient({
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
              setOpen(true)
            }}
          >
            <PlusIcon className="w-4 h-4" />
            New Client
          </Button>
          <ClientDialog open={open} setOpen={setOpen} initialData={selectedClient} />
        </div>
      </div>

      <Card className="h-full">
        <CardHeader className="flex-row justify-between border-b p-3">
          <div className="flex items-center w-1/3 relative">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-1" />
            <Input className="pl-6 border-none focus:outline-none" placeholder="Search for clients" />
          </div>
          <div>
            <p>Client Limit: 1 / 3</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col p-3 gap-3">
          <CardTitle className="text-xl pl-2">
            Client List
          </CardTitle>
          <ClientTable initialData={initialData} handleEdit={handleEdit} />
        </CardContent>
      </Card>
    </div>
  )
}