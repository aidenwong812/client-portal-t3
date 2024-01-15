"use client"

import { AvatarIcon } from "@radix-ui/react-icons"
import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card"
import { Input } from "@acme/ui/input"
import { Label } from "@acme/ui/label"

export const WhitelabelCard = () => {
  return (
    <Card className="h-full py-3">
      <CardHeader className="p-3">
        <CardTitle className="text-2xl text-center">
          Whitelabel Dashboard
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
      </CardContent>
    </Card>
  )
}