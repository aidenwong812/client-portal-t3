"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { TrashIcon } from "@radix-ui/react-icons"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@acme/ui/table"
import { Checkbox } from "@acme/ui/checkbox"
import { Badge } from "@acme/ui/badge";
import { Button } from "@acme/ui/button";

type KnowledgeBaseType = {
  documentID: string,
  status: {
    type: string
  },
  data: {
    type: string,
    name: string,
    url?: string
  },
  tags: string[],
  updatedAt: string
}[]

type Prop = {
  VOICEFLOW_ENDPOINT: string,
  VOICEFLOW_API: string,
  openCreate: boolean,
}

export const KnowledgeBaseTable = ({ VOICEFLOW_ENDPOINT, VOICEFLOW_API, openCreate }: Prop) => {
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseType>([])

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${VOICEFLOW_ENDPOINT}/knowledge-base/docs`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': VOICEFLOW_API,
        }
      })
        .then(res => {
          if (res.data)
            setKnowledgeBase(res.data.data)
        })
        .catch((err) => console.error(err))
    };
    fetchData()
  }, [openCreate])

  const handleDeleteClick = async (documentID: string) => {
    if (documentID)
      await axios.delete(`${VOICEFLOW_ENDPOINT}/knowledge-base/faqs/${documentID}`, {
        headers: {
          'Authorization': VOICEFLOW_API,
        }
      })
        .finally(async () => {
          await axios.get(`${VOICEFLOW_ENDPOINT}/knowledge-base/docs`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': VOICEFLOW_API,
            }
          })
            .then(res => {
              if (res.data)
                setKnowledgeBase(res.data.data)
            })
            .catch((err) => console.error(err))
        })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead><Checkbox /></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border-b">
        {knowledgeBase.map((one) => (
          <TableRow key={one.documentID}>
            <TableCell><Checkbox /></TableCell>
            <TableCell className="font-medium">{one.data.name}</TableCell>
            <TableCell>{one.data.type}</TableCell>
            <TableCell>
              {one.status.type}
              {/* <Badge className="rounded-full font-bold text-[color:hsl(142.1,76.2%,36.3%)] bg-[color:hsla(142.1,76.2%,36.3%,0.2)]">
                success
              </Badge> */}
            </TableCell>
            <TableCell>{new Intl.DateTimeFormat('en-US').format(new Date(one.updatedAt))}</TableCell>
            <TableCell>
              {
                one.tags.map(tag => tag)
              }
            </TableCell>
            <TableCell className="text-right">
              <Button className="rounded-full" variant="ghost" size="icon" onClick={() => handleDeleteClick(one.documentID)}>
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}