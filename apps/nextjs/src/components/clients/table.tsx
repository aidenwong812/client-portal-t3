"use client";

import { CheckIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@acme/ui/table"
import { Checkbox } from "@acme/ui/checkbox"
import { Button } from "@acme/ui/button"
import { ClientSwitch } from "./switch";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export const ClientTable = () => {
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
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell><Checkbox /></TableCell>
            <TableCell className="font-medium">Aiden</TableCell>
            <TableCell>lionstar259007@gmail.com</TableCell>
            <TableCell>N/A</TableCell>
            <TableCell><CheckIcon /></TableCell>
            <TableCell className="flex min-w-80 justify-between">
              <ClientSwitch text="Analytics" />
              <ClientSwitch text="Transcripts" />
              <ClientSwitch text="Knowledge Base" />
              <ClientSwitch text="Tags" />
              <ClientSwitch text="FAQ" />
            </TableCell>
            <TableCell className="text-center">
              <Button className="rounded-full" variant="ghost" size="icon">
                <Pencil2Icon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}