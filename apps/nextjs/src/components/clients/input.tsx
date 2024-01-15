import { Input } from "@acme/ui/input"
import { Label } from "@acme/ui/label"

type Prop = {
  text: string,
  type?: string
}

export const ClientInput = ({ text, type = "text" }: Prop) => {
  return (
    <div className="grid items-center gap-4">
      <Label htmlFor={text}>
        {text}
      </Label>
      <Input id={text} className="" type={type} />
    </div>
  )
}