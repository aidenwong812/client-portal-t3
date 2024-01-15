import { Input } from "@acme/ui/input"
import { Label } from "@acme/ui/label"

type Prop = {
  text: string
}

export const ClientInput = ({ text }: Prop) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={text} className="text-right">
        {text}
      </Label>
      <Input id={text} value="Pedro Duarte" className="col-span-3" />
    </div>
  )
}