"use client";

import { useEffect, useState } from "react"
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@acme/ui/table"
import { Checkbox } from "@acme/ui/checkbox"
import { Badge } from "@acme/ui/badge";

type FAQType = {
  faqSetID: string,
  name: string,
  status: {
    type: string
  },
  updatedAt: string
}[]

type Prop = {
  VOICEFLOW_ENDPOINT: string
  VOICEFLOW_API: string
}

export const FAQTable = ({ VOICEFLOW_ENDPOINT, VOICEFLOW_API }: Prop) => {
  const [faqSets, setFaqSets] = useState<FAQType>([])

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
            setFaqSets(res.data.data)
        })
        .catch((err) => console.error(err))
    };
    fetchData()
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead><Checkbox /></TableHead>
          <TableHead>Name of FAQ Set</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Create Date</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}