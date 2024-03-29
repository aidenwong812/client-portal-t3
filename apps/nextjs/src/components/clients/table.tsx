"use client";

import { useState } from "react";
import { CheckIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import { api } from "@/trpc/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@acme/ui/table"
import { Checkbox } from "@acme/ui/checkbox"
import { Button } from "@acme/ui/button"
import { ClientSwitch } from "./switch"

type Clients = {
  id: string,
  name: string,
  apiKey: string,
  analytics: boolean,
  transcripts: boolean,
  knowledgeBase: boolean,
  tags: boolean,
  faq: boolean,
  clientEmail: string,
}[]

type Props = {
  initialData: Clients,
  handleEdit: (id: string) => void,
}

export const ClientTable = ({ initialData, handleEdit }: Props) => {
  const [assistants, setAssistants] = useState<Clients>(initialData)

  // const clients = api.assistant.all.useQuery(undefined, {
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // })

  const updateAssitant = api.assistant.update.useMutation({
    // onSettled: () => clients.refetch()
  })

  const deleteAssitant = api.assistant.delete.useMutation({
    // onSettled: () => clients.refetch()
  })

  const handleChange = async (updateType: string, value: boolean, id: string) => {
    setAssistants(prev => prev.map(one => one.id === id ? { ...one, [updateType]: value } : one))
    await updateAssitant.mutateAsync({ id, })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead><Checkbox /></TableHead>
          <TableHead>Nickname</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Expire Date</TableHead>
          <TableHead>Verified</TableHead>
          <TableHead>Features</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border-b">
        {assistants.map((assistant) => (
          <TableRow key={assistant.id}>
            <TableCell><Checkbox /></TableCell>
            <TableCell className="font-medium">{assistant.name}</TableCell>
            <TableCell>{assistant.clientEmail}</TableCell>
            <TableCell>N/A</TableCell>
            <TableCell><CheckIcon /></TableCell>
            <TableCell className="flex min-w-80 justify-between">
              <ClientSwitch id={assistant.id} text="Analytics" updateType="analytics" defaultValue={assistant.analytics} updateValue={handleChange} />
              <ClientSwitch id={assistant.id} text="Transcripts" updateType="transcripts" defaultValue={assistant.transcripts} updateValue={handleChange} />
              <ClientSwitch id={assistant.id} text="Knowledge Base" updateType="knowledgeBase" defaultValue={assistant.knowledgeBase} updateValue={handleChange} />
              <ClientSwitch id={assistant.id} text="Tags" updateType="tags" defaultValue={assistant.tags} updateValue={handleChange} />
              <ClientSwitch id={assistant.id} text="FAQ" updateType="faq" defaultValue={assistant.faq} updateValue={handleChange} />
            </TableCell>
            <TableCell className="text-center">
              <Button className="rounded-full" variant="ghost" size="icon" onClick={() => handleEdit(assistant.id)}>
                <Pencil2Icon />
              </Button>
              <Button className="rounded-full" variant="ghost" size="icon" onClick={() => deleteAssitant.mutate({ id: assistant.id })}>
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}