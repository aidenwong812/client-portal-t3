"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { PlusIcon } from "@radix-ui/react-icons"
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
import { Input } from "@acme/ui/input"
import { FAQCard } from "./card"

type Prop = {
  VOICEFLOW_ENDPOINT: string,
  VOICEFLOW_API: string,
  openCreate: boolean,
  setOpenCreate: (open: boolean) => void,
  faqSetID: string
}

export const FAQCreateDialog = ({ VOICEFLOW_ENDPOINT, VOICEFLOW_API, openCreate, setOpenCreate, faqSetID }: Prop) => {
  const [name, setName] = useState("")
  const [FAQs, setFAQs] = useState([{
    faqID: "",
    question: "",
    answer: ""
  }])

  useEffect(() => {
    const fetchData = async () => {
      if (faqSetID)
        await axios.get(`${VOICEFLOW_ENDPOINT}/knowledge-base/faqs/${faqSetID}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': VOICEFLOW_API,
          }
        })
          .then(res => {
            if (res.data) {
              setName(res.data.data.name as string)
              setFAQs(res.data.faqSetItems as [{
                faqID: string,
                question: string,
                answer: string
              }])
            }
          })
          .catch((err) => console.error(err))
    }
    fetchData()
  }, [faqSetID])

  const handleChange = (question: string, answer: string, faqID?: string) => {
    setFAQs(prevFAQs => prevFAQs.map(one => {
      if (one.faqID === faqID) {
        return {
          faqID,
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

    if (faqSetID)
      await axios.delete(`${VOICEFLOW_ENDPOINT}/knowledge-base/faqs/${faqSetID}`, {
        headers: {
          'Authorization': VOICEFLOW_API,
        }
      })

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
          console.log(res.data)
      })
      .catch(err => console.log(err))
      .finally(() => setOpenCreate(false))
  }

  return (
    <Dialog open={openCreate} onOpenChange={setOpenCreate}>
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
                <FAQCard key={faq.faqID} faq={faq} onDelete={() => setFAQs(prev => prev.filter(one => one.faqID !== faq.faqID))} onChange={handleChange} />
              ))
            }
          </div>

          <Button
            className="uppercase rounded-full flex gap-1 items-center"
            onClick={() => setFAQs(prev => [...prev, {
              faqID: (prev[prev.length - 1]?.faqID ?? "") + 1,
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