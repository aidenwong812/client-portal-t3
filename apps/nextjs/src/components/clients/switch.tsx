import { useState } from "react"
import { Label } from "@acme/ui/label"
import { Switch } from "@acme/ui/switch"

type Prop = {
  id?: string
  text: string,
  defaultValue: boolean,
  updateType: string,
  updateValue: (updateType: string, value: boolean, id: string) => void
}

export const ClientSwitch = ({ id, text, defaultValue, updateType, updateValue }: Prop) => {
  const [value, setValue] = useState(defaultValue)

  const updateInputValue = (val: boolean) => {
    setValue(val)
    updateValue(updateType, val, id!)
  }

  return (
    <div className="grid gap-1 justify-items-center">
      <Label className="text-xs text-nowrap" htmlFor={text}>{text}</Label>
      <Switch id={text} checked={value} onCheckedChange={updateInputValue} />
    </div>
  )
}