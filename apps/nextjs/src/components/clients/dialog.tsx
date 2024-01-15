import { PlusIcon } from "@radix-ui/react-icons"
import { Button } from "@acme/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog"
import { ClientInput } from "./input"

export const ClientDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="uppercase rounded-xl flex gap-1 items-center">
          <PlusIcon className="w-4 h-4" />
          New Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register Client</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ClientInput text="Nickname" />
          <ClientInput text="Email" />
          <ClientInput text="Password" />
          <ClientInput text="API Key" />
          <ClientInput text="Project ID" />
          <ClientInput text="Nickname" />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}