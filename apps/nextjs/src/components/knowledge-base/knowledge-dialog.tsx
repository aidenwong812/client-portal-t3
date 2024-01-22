"use client"

import React from "react"
import axios from "axios"
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

type Prop = {
  VOICEFLOW_ENDPOINT: string,
  VOICEFLOW_API: string,
  setOpenCreate: (open: boolean) => void,
}

export const AddKnowledgeBaseDialog = ({ VOICEFLOW_ENDPOINT, VOICEFLOW_API, setOpenCreate }: Prop) => {
  const [openURL, setOpenURL] = React.useState(false)
  const [openSitemap, setOpenSitemap] = React.useState(false)
  const [openFileUpload, setOpenFileUpload] = React.useState(false)
  const [url, setUrl] = React.useState("")
  const [sitemap, setSitemap] = React.useState("")
  const [file, setFile] = React.useState<File>()

  const handleChange = (updateType: string, value: string) => {
    if (updateType === "url")
      setUrl(value)
    if (updateType === "sitemap")
      setSitemap(value)
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files?.length && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleFileUpload = async () => {
    await axios.post(`${VOICEFLOW_ENDPOINT}/knowledge-base/docs/upload`, {
      file
    }, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': VOICEFLOW_API,
      }
    })
      .then(res => {
        if (res.data) {
          console.log(res.data)
          setOpenFileUpload(false)
        }
      })
      .catch(err => console.log(err))
      .finally(() => setOpenCreate(false))
  }

  const handleURLUpload = async () => {
    const data = {
      type: 'url',
      name: url,
      url: url
    }

    await axios.post(`${VOICEFLOW_ENDPOINT}/knowledge-base/docs/upload`, {
      data
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': VOICEFLOW_API,
      }
    })
      .then(res => {
        if (res.data) {
          console.log(res.data)
          setOpenURL(false)
          setOpenSitemap(false)
        }
      })
      .catch(err => console.log(err))
      .finally(() => setOpenCreate(false))
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
          <DropdownMenuItem onSelect={() => setOpenFileUpload(true)}>
            FILE
            <DropdownMenuShortcut>10mb max</DropdownMenuShortcut>
          </DropdownMenuItem>
          {/* <DropdownMenuItem onSelect={() => setOpenFileUpload(true)}>
            PDF
            <DropdownMenuShortcut>10mb max</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpenFileUpload(true)}>
            DOC
            <DropdownMenuShortcut>10mb max</DropdownMenuShortcut>
          </DropdownMenuItem> */}
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
            <Button type="submit" className="rounded-full" onClick={handleURLUpload}>UPLOAD</Button>
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
            <Button type="submit" className="rounded-full" onClick={handleURLUpload}>UPLOAD</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openFileUpload} onOpenChange={setOpenFileUpload}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <Label htmlFor="file">
              File (TXT, PDF, DOC)
            </Label>
            <Input id={"file"} type="file" accept=".txt, .pdf, .doc" onChange={handleFile} />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="rounded-full" onClick={() => setOpenFileUpload(false)}>
                CANCEL
              </Button>
            </DialogClose>
            <Button type="submit" className="rounded-full" onClick={handleFileUpload}>UPLOAD</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}