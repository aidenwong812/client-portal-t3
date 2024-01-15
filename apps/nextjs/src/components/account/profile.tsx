"use client"

import { AvatarIcon } from "@radix-ui/react-icons"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@acme/ui/card"
import { Input } from "@acme/ui/input"
import { Label } from "@acme/ui/label"
import { ClientInput } from "../clients/input"
import { Button } from "@acme/ui/button"

export const ProfileCard = () => {
  return (
    <Card className="h-full py-3">
      <CardHeader className="p-3">
        <CardTitle className="text-2xl text-center">
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-3 gap-3">
        <div className="flex flex-col items-center">
          <Label htmlFor="picture" className="cursor-pointer">
            <AvatarIcon className="w-40 h-40" />
          </Label>
          <Input id="picture" type="file" className="hidden" />
          <Label>Agency Logo</Label>
        </div>
        <div className="flex flex-col gap-4">
          <ClientInput text="EMAIL" />
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <ClientInput text="PASSWORD" />
            </div>
            <Button className="px-1" variant="outline">CHANGE</Button>
          </div>
          <ClientInput text="SUBSCRIPTION RENEW DATE" />
        </div>
      </CardContent>
      <CardFooter className="p-3">
        <Button className="w-full" variant="destructive">DELETE ACCOUNT</Button>
      </CardFooter>
    </Card>
  )
}