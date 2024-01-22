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

import { KnowledgeBasePreviewDialog } from "@/components/knowledge-base/preview-dialog"
import { AddKnowledgeBaseDialog } from "@/components/knowledge-base/knowledge-dialog"
import { KnowledgeBaseTable } from "@/components/knowledge-base/table"
import { Button } from "@acme/ui/button"

export const Content = () => {
  const VOICEFLOW_ENDPOINT = process.env.NEXT_PUBLIC_VOICEFLOW_ENDPOINT
  const VOICEFLOW_API = process.env.NEXT_PUBLIC_VOICEFLOW_API

  const [openCreate, setOpenCreate] = React.useState(false)

  return (
    <div className="flex flex-1 flex-col gap-6 px-12 py-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Knowledge Base</h2>
        <div className="flex gap-2">
          <div className="flex items-center space-x-2">
            <KnowledgeBasePreviewDialog />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              className="uppercase rounded-full flex gap-1 items-center"
              onClick={() => {
                setOpenCreate(true)
              }}
            >
              <PlusIcon className="w-4 h-4" />
              Data Source
            </Button>
            <AddKnowledgeBaseDialog
              VOICEFLOW_ENDPOINT={VOICEFLOW_ENDPOINT!}
              VOICEFLOW_API={VOICEFLOW_API!}
              setOpenCreate={setOpenCreate}
            />
          </div>
        </div>
      </div>

      <Card className="h-full">
        <CardHeader className="flex-row justify-between border-b p-3">
          <div className="flex items-center w-1/3 relative">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-1" />
            <Input className="pl-6 border-none focus:outline-none" placeholder="Search for FAQ Sets" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col p-3 gap-3">
          <CardTitle className="text-xl pl-2">
            Data Sources
          </CardTitle>
          <KnowledgeBaseTable
            VOICEFLOW_ENDPOINT={VOICEFLOW_ENDPOINT!}
            VOICEFLOW_API={VOICEFLOW_API!}
            openCreate={openCreate}
          />
        </CardContent>
      </Card>
    </div>
  )
}