import { useState } from "react"
import { Input } from "@acme/ui/input"
import { Label } from "@acme/ui/label"

type Prop = {
  text: string,
  type?: string,
  defaultValue?: string,
  updateType: string,
  updateValue: (updateType: string, value: string) => void
}

export const CommonInput = ({ text, type = "text", defaultValue, updateType, updateValue }: Prop) => {
  const [value, setValue] = useState(defaultValue)

  const updateInputValue = (val: string) => {
    setValue(val)
    updateValue(updateType, val)
  }

  return (
    <div className="grid items-center gap-4">
      <Label htmlFor={text}>
        {text}
      </Label>
      <Input id={text} className="" type={type} value={value} onChange={(e) => updateInputValue(e.target.value)} />
    </div>
  )
}