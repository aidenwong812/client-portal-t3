"use client"

import { CheckCircledIcon, CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@acme/ui/button"
import { Badge } from "@acme/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@acme/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@acme/ui/tabs"

export const PlanCard = () => {
  return (
    <Card className="h-full p-3">
      <CardHeader className="p-3">
        <CardTitle className="text-2xl text-center">
          Subscription Plan
        </CardTitle>
      </CardHeader>

      <CardContent className="p-3">
        <Tabs defaultValue="monthly">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="monthly">MONTHLY</TabsTrigger>
            <TabsTrigger value="annual">ANNUAL(SAVE 20%)</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly">
            <div className="grid grid-cols-3 gap-8 mt-6 items-center">
              <Card className="relative">
                <Badge className="flex gap-1 absolute right-2 top-2 rounded-full px-2" variant="secondary">
                  <CheckCircledIcon />
                  Current Plan
                </Badge>

                <CardHeader>
                  <CardTitle className="text-[color:hsl(142.1,76.2%,36.3%)]">STARTER</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  <CardTitle><span className="text-3xl font-bold">$0</span>{' '}/month</CardTitle>
                  <CardDescription className="text-md">
                    For small agencies or startups new to AI chatbot services that need the basics
                  </CardDescription>

                  <div className="grid grid-cols-6 gap-2 pt-3 text-sm items-center">
                    <CheckIcon className="w-6 h-6 text-[color:hsl(142.1,76.2%,36.3%)]" />
                    <p className="col-span-5">Full Voiceflow Assistant API integrations.</p>

                    <CheckIcon className="w-6 h-6 text-[color:hsl(142.1,76.2%,36.3%)]" />
                    <p className="col-span-5">Standard agency dashboard access.</p>

                    <CheckIcon className="w-6 h-6 text-[color:hsl(142.1,76.2%,36.3%)]" />
                    <p className="col-span-5">Up to 3 client accounts.</p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full bg-[color:hsl(142.1,76.2%,36.3%)]" variant="secondary">UPGRADE PLAN</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[color:hsl(221.2,83.2%,53.3%)]">PROFESSIONAL</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  <CardTitle><span className="text-3xl font-bold">$35</span>{' '}/month</CardTitle>
                  <CardDescription className="text-md">
                    For growing agencies requiring more functionality, support and brand presence
                  </CardDescription>

                  <div className="grid grid-cols-6 gap-2 pt-3 text-sm items-center">
                    <CheckIcon className="w-6 h-6 text-[color:hsl(221.2,83.2%,53.3%)]" />
                    <p className="col-span-5">All Free Starter Plan features.</p>

                    <CheckIcon className="w-6 h-6 text-[color:hsl(221.2,83.2%,53.3%)]" />
                    <p className="col-span-5">Branded agency dashboard. (Logo)</p>

                    <CheckIcon className="w-6 h-6 text-[color:hsl(221.2,83.2%,53.3%)]" />
                    <p className="col-span-5">Up to 15 client accounts.</p>

                    <CheckIcon className="w-6 h-6 text-[color:hsl(221.2,83.2%,53.3%)]" />
                    <p className="col-span-5">Custom Domain Feature: Allows agencies to use their own domain for a more branded and professional appearance.</p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full bg-[color:hsl(221.2,83.2%,53.3%)]" variant="secondary">UPGRADE PLAN</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[color:hsl(24.6,95%,53.1%)]">PREMIUM</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  <CardTitle><span className="text-3xl font-bold">$50</span>{' '}/month</CardTitle>
                  <CardDescription className="text-md">
                    For established agencies needing more comprehensive tools and scalability
                  </CardDescription>

                  <div className="grid grid-cols-6 gap-2 pt-3 text-sm items-center">
                    <CheckIcon className="w-6 h-6 text-[color:hsl(24.6,95%,53.1%)]" />
                    <p className="col-span-5">All Professional Plan features, including the custom domain.</p>

                    <CheckIcon className="w-6 h-6 text-[color:hsl(24.6,95%,53.1%)]" />
                    <p className="col-span-5">Unlimited client accounts.</p>

                    <CheckIcon className="w-6 h-6 text-[color:hsl(24.6,95%,53.1%)]" />
                    <p className="col-span-5">Priority support with faster response times.</p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full bg-[color:hsl(24.6,95%,53.1%)]" variant="secondary">UPGRADE PLAN</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="annual">
            <div className="grid grid-cols-3 gap-8 mt-6 items-center">
              <Card className="relative">
                <Badge className="flex gap-1 absolute right-2 top-2 rounded-full px-2" variant="secondary">
                  <CheckCircledIcon />
                  Current Plan
                </Badge>

                <CardHeader>
                  <CardTitle className="text-[color:hsl(142.1,76.2%,36.3%)]">STARTER</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  <CardTitle><span className="text-3xl font-bold">$0</span>{' '}/month</CardTitle>
                  <CardDescription className="text-md">
                    For small agencies or startups new to AI chatbot services that need the basics
                  </CardDescription>

                  <div className="grid grid-cols-6 gap-2 pt-3 text-sm items-center">
                    <CheckIcon className="w-6 h-6 text-[color:hsl(142.1,76.2%,36.3%)]" />
                    <p className="col-span-5">Full Voiceflow Assistant API integrations.</p>

                    <CheckIcon className="w-6 h-6 text-[color:hsl(142.1,76.2%,36.3%)]" />
                    <p className="col-span-5">Standard agency dashboard access.</p>

                    <CheckIcon className="w-6 h-6 text-[color:hsl(142.1,76.2%,36.3%)]" />
                    <p className="col-span-5">Up to 3 client accounts.</p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full bg-[color:hsl(142.1,76.2%,36.3%)]" variant="secondary">UPGRADE PLAN</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[color:hsl(221.2,83.2%,53.3%)]">PROFESSIONAL</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  <CardTitle><span className="text-3xl font-bold">$35</span>{' '}/month</CardTitle>
                  <CardDescription className="text-sm text-[color:hsl(221.2,83.2%,53.3%)]">
                    (billed annually at $336, saving $84/year)
                  </CardDescription>
                  <CardDescription className="text-md">
                    For growing agencies requiring more functionality, support and brand presence
                  </CardDescription>

                  <div className="grid grid-cols-6 gap-2 pt-3 text-sm items-center">
                    <CheckIcon className="w-6 h-6 text-[color:hsl(221.2,83.2%,53.3%)]" />
                    <p className="col-span-5">All Free Starter Plan features.</p>

                    <CheckIcon className="w-6 h-6 text-[color:hsl(221.2,83.2%,53.3%)]" />
                    <p className="col-span-5">Branded agency dashboard. (Logo)</p>

                    <CheckIcon className="w-6 h-6 text-[color:hsl(221.2,83.2%,53.3%)]" />
                    <p className="col-span-5">Up to 15 client accounts.</p>

                    <CheckIcon className="w-6 h-6 text-[color:hsl(221.2,83.2%,53.3%)]" />
                    <p className="col-span-5">Custom Domain Feature: Allows agencies to use their own domain for a more branded and professional appearance.</p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full bg-[color:hsl(221.2,83.2%,53.3%)]" variant="secondary">UPGRADE PLAN</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[color:hsl(24.6,95%,53.1%)]">PREMIUM</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  <CardTitle><span className="text-3xl font-bold">$50</span>{' '}/month</CardTitle>
                  <CardDescription className="text-sm text-[color:hsl(24.6,95%,53.1%)]">
                    (billed annually at $480, saving $120/year)
                  </CardDescription>
                  <CardDescription className="text-md">
                    For established agencies needing more comprehensive tools and scalability
                  </CardDescription>

                  <div className="grid grid-cols-6 gap-2 pt-3 text-sm items-center">
                    <CheckIcon className="w-6 h-6 text-[color:hsl(24.6,95%,53.1%)]" />
                    <p className="col-span-5">All Professional Plan features, including the custom domain.</p>

                    <CheckIcon className="w-6 h-6 text-[color:hsl(24.6,95%,53.1%)]" />
                    <p className="col-span-5">Unlimited client accounts.</p>

                    <CheckIcon className="w-6 h-6 text-[color:hsl(24.6,95%,53.1%)]" />
                    <p className="col-span-5">Priority support with faster response times.</p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full bg-[color:hsl(24.6,95%,53.1%)]" variant="secondary">UPGRADE PLAN</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}