"use client";

import { useEffect, useState } from "react"
import axios from "axios";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@acme/ui/table"
import { Checkbox } from "@acme/ui/checkbox"
import { Badge } from "@acme/ui/badge";
import { Button } from "@acme/ui/button";

type FAQSetType = {
  faqSetID: string,
  name: string,
  status: {
    type: string
  },
  updatedAt: string
}[]

export type FAQType = {
  faqID: string,
  question: string,
  answer: string
}

type Prop = {
  VOICEFLOW_ENDPOINT: string,
  VOICEFLOW_API: string,
  openCreate: boolean,
  setOpenCreate: (open: boolean) => void,
  setFaqSetID: React.Dispatch<React.SetStateAction<string>>
}

export const FAQTable = ({ VOICEFLOW_ENDPOINT, VOICEFLOW_API, openCreate, setOpenCreate, setFaqSetID }: Prop) => {
  const [faqSets, setFaqSets] = useState<FAQSetType>([])

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${VOICEFLOW_ENDPOINT}/knowledge-base/faqs`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': VOICEFLOW_API,
        }
      })
        .then(res => {
          if (res.data)
            setFaqSets(res.data.data as FAQSetType)
        })
        .catch((err) => console.error(err))
    }
    fetchData()
  }, [openCreate])

  const handleEditClick = (faqSetID: string) => {
    setFaqSetID(faqSetID)
    setOpenCreate(true)
  }

  const handleDeleteClick = async (faqSetID: string) => {
    if (faqSetID)
      await axios.delete(`${VOICEFLOW_ENDPOINT}/knowledge-base/faqs/${faqSetID}`, {
        headers: {
          'Authorization': VOICEFLOW_API,
        }
      })
        .finally(async () => {
          await axios.get(`${VOICEFLOW_ENDPOINT}/knowledge-base/faqs`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': VOICEFLOW_API,
            }
          })
            .then(res => {
              if (res.data)
                setFaqSets(res.data.data as FAQSetType)
            })
            .catch((err) => console.error(err))
        })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead><Checkbox /></TableHead>
          <TableHead>Name of FAQ Set</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Create Date</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border-b">
        {faqSets.map((faq) => (
          <TableRow key={faq.faqSetID}>
            <TableCell><Checkbox /></TableCell>
            <TableCell className="font-medium">{faq.name}</TableCell>
            <TableCell>
              {faq.status.type}
              {/* <Badge className="rounded-full font-bold text-[color:hsl(142.1,76.2%,36.3%)] bg-[color:hsla(142.1,76.2%,36.3%,0.2)]">
                success
              </Badge> */}
            </TableCell>
            <TableCell>{new Intl.DateTimeFormat('en-US').format(new Date(faq.updatedAt))}</TableCell>
            <TableCell className="text-right">
              <Button className="rounded-full" variant="ghost" size="icon" onClick={() => handleEditClick(faq.faqSetID)}>
                <Pencil2Icon />
              </Button>
              <Button className="rounded-full" variant="ghost" size="icon" onClick={() => handleDeleteClick(faq.faqSetID)}>
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}