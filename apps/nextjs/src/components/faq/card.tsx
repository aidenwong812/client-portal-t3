import { TrashIcon } from "@radix-ui/react-icons"

import { Card, CardContent } from "@acme/ui/card"
import { Button } from "@acme/ui/button"
import { CommonInput } from "../common/input"
import { useState } from "react"

type Prop = {
  faq: {
    id: number,
    question: string,
    answer: string
  },
  onDelete: () => void,
  onChange: (
    id: number,
    question: string,
    answer: string
  ) => void,
}

export const FAQCard = ({ faq, onDelete, onChange }: Prop) => {
  const [question, setQuestion] = useState(faq.question)
  const [answer, setAnswer] = useState(faq.answer)

  const handleChange = (updateType: string, value: string) => {
    switch (updateType) {
      case "question":
        setQuestion(value)
        onChange(
          faq.id,
          value,
          answer
        )
        break
      case "answer":
        setAnswer(value)
        onChange(
          faq.id,
          question,
          value
        )
        break
    }
  }

  return (
    <Card className="w-[360px] relative">
      <Button
        className="absolute right-2 top-1 rounded-full size-8"
        size="icon"
        variant="ghost"
        onClick={onDelete}
      >
        <TrashIcon className="text-red-500" />
      </Button>
      <CardContent className="flex flex-col space-y-3 mt-6">
        <CommonInput text="Question" defaultValue={question} updateType="question" updateValue={handleChange} />
        <CommonInput text="Answer" defaultValue={answer} updateType="answer" updateValue={handleChange} />
      </CardContent>
    </Card>
  )
}