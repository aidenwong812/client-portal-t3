import { Label } from "@acme/ui/label"
import { Switch } from "@acme/ui/switch"

type Prop = {
  text: string
}

export const ClientSwitch = ({ text }: Prop) => {
  return (
    <div className="grid gap-1 justify-items-center">
      <Label className="text-xs text-nowrap" htmlFor={text}>{text}</Label>
      <Switch id={text} />
    </div>
  )
}