"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@acme/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select"
import { Overview } from "@/components/analytics/overview"
import { getAnalyticsData } from "./action"

export const Content = () => {
  const [period, setPeirod] = useState("7")
  const [data, setData] = useState({
    total: {
      interactions: 0,
      unique_users: 0,
      sessions: 0,
    },
    interactions: [{ name: "", total: 0 }],
    sessions: [{ name: "", total: 0 }],
    top_intents: [{ name: "", total: "" }],
    understood_messages: [{ name: "", total: 0 }],
    unique_users: [{ name: "", total: 0 }],
    tokens: [{ name: "", total: "" }]
  })

  useEffect(() => {
    getAnalyticsData(period)
      .then(res => setData(res))
      .catch(err => console.log(err))
  }, [period])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 overflow-y-auto h-screen">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Select defaultValue={period} onValueChange={(e) => setPeirod(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Last 7 days" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Period</SelectLabel>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="60">Last 60 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Interactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.total.interactions}</div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Unique Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.total.unique_users}</div>
            {/* <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Unique Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.total.sessions}</div>
            {/* <p className="text-xs text-muted-foreground">
              +19% from last month
            </p> */}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Interactions</CardTitle>
            <CardDescription>
              Total number of engagements users have had with your assistant
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={data.interactions} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recognition Rate</CardTitle>
            <CardDescription>
              The % of messages understood by your assistant
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={data.understood_messages} />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Unique user sessions with your assistant
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={data.unique_users} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sessions</CardTitle>
            <CardDescription>
              Unique user sessions with your assistant
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={data.sessions} />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Intents</CardTitle>
            <CardDescription>
              The most popular queries users ask your assistant
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={data.top_intents} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Token</CardTitle>
            <CardDescription>
              The token usage by models
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={data.tokens} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}