"use client"

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
import { Input } from "@acme/ui/input"
import { useState } from "react"
import { FAQCard } from "./card"
import axios from "axios"
import { redirect } from "next/navigation"

type Prop = {
  VOICEFLOW_ENDPOINT: string
  VOICEFLOW_API: string
}

export const FAQCreateDialog = ({ VOICEFLOW_ENDPOINT, VOICEFLOW_API }: Prop) => {
  const [name, setName] = useState("")
  const [FAQs, setFAQs] = useState([{
    id: 0,
    question: "",
    answer: ""
  }])

  const handleChange = (id: number, question: string, answer: string) => {
    setFAQs(prevFAQs => prevFAQs.map(one => {
      if (one.id === id) {
        return {
          id,
          question,
          answer
        }
      }
      return one
    }))
  }

  const handleSubmit = async () => {
    const data = {
      name: name,
      faqs: FAQs.map(faq => {
        return {
          question: faq.question,
          answer: faq.answer
        }
      })
    }

    await axios.post(`${VOICEFLOW_ENDPOINT}/knowledge-base/faqs`, {
      data: data
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': VOICEFLOW_API,
      }
    })
      .then(res => {
        if (res.data)
          redirect("/faq")
      })
      .catch(err => console.log(err))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="uppercase rounded-full flex gap-1 items-center">
          <PlusIcon className="w-4 h-4" />
          Create FAQ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a FAQ Set</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="name">
              Name:
            </Label>
            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto px-2">
            {
              FAQs.map(faq => (
                <FAQCard key={faq.id} faq={faq} onDelete={() => setFAQs(prev => prev.filter(one => one.id !== faq.id))} onChange={handleChange} />
              ))
            }
          </div>

          <Button
            className="uppercase rounded-full flex gap-1 items-center"
            onClick={() => setFAQs(prev => [...prev, {
              id: (prev[prev.length - 1]?.id ?? 0) + 1,
              question: "",
              answer: ""
            }])}
          >
            <PlusIcon className="w-4 h-4" />
            Add Another Set
          </Button>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="rounded-full">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" className="rounded-full" onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}