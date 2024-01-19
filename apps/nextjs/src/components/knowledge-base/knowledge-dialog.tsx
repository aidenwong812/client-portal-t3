"use client"

import React from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@acme/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@acme/ui/dropdown-menu"
import { Button } from "@acme/ui/button"
import { Label } from "@acme/ui/label"
import { Input } from "@acme/ui/input"

import { CommonInput } from "../common/input"

export const AddKnowledgeBaseDialog = () => {
  const [openURL, setOpenURL] = React.useState(false)
  const [openSitemap, setOpenSitemap] = React.useState(false)
  const [url, setUrl] = React.useState("")
  const [sitemap, setSitemap] = React.useState("")

  const handleChange = (updateType: string, value: string) => {
    if (updateType === "url")
      setUrl(value)
    if (updateType === "sitemap")
      setSitemap(value)
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target?.files?.length && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onloadend = () => {
        console.log(reader.result)
      }
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="uppercase rounded-full flex gap-1 items-center">
            <PlusIcon className="w-4 h-4" />
            Data Source
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onSelect={() => setOpenURL(true)}>URL</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpenSitemap(true)}>Sitemap</DropdownMenuItem>
          <DropdownMenuItem className="relative py-2">
            <Label htmlFor="text" className="absolute h-full w-full py-1.5 top-0.5">
              Text
            </Label>
            <Input id="text" className="hidden" type="file" onChange={(e) => handleUpload(e, "text")} />
            <DropdownMenuShortcut>10mb max</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="relative py-2">
            <Label htmlFor="text" className="absolute h-full w-full py-1.5 top-0.5">
              PDF
            </Label>
            <Input id="text" className="hidden" type="file" onChange={(e) => handleUpload(e, "text")} />
            <DropdownMenuShortcut>10mb max</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="relative py-2">
            <Label htmlFor="text" className="absolute h-full w-full py-1.5 top-0.5">
              DOC
            </Label>
            <Input id="text" className="hidden" type="file" onChange={(e) => handleUpload(e, "text")} />
            <DropdownMenuShortcut>10mb max</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openURL} onOpenChange={setOpenURL}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add URL</DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <CommonInput text="URL" defaultValue={url} updateType="url" updateValue={handleChange} />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="rounded-full" onClick={() => setOpenURL(false)}>
                CANCEL
              </Button>
            </DialogClose>
            <Button type="submit" className="rounded-full">UPLOAD</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openSitemap} onOpenChange={setOpenSitemap}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add URLs From Sitemap</DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <CommonInput text="Sitemap URL" defaultValue={sitemap} updateType="sitemap" updateValue={handleChange} />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="rounded-full" onClick={() => setOpenSitemap(false)}>
                CANCEL
              </Button>
            </DialogClose>
            <Button type="submit" className="rounded-full">UPLOAD</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}