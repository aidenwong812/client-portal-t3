"use client"

import { useEffect, useState } from "react"
import axios from "axios"
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

export const Content = () => {
  const VOICEFLOW_API = process.env.NEXT_PUBLIC_VOICEFLOW_API

  const [period, setPeirod] = useState("7")

  useEffect(() => {
    const fetchData = async () => {
      const startTime = new Date()
      startTime.setDate(startTime.getDate() - parseInt(period))
      console.log('endTime', startTime.toISOString())
      axios.post("https://analytics-api.voiceflow.com/v1/query/usage", {
        query: [
          {
            name: "interactions",
            filter: {
              projectID: "656cd0725061e600072a209c",
              startTime: startTime.toISOString(),
              endTime: new Date().toISOString(),
            }
          },
          {
            name: "sessions",
            filter: {
              projectID: "656cd0725061e600072a209c",
              startTime: startTime.toISOString(),
              endTime: new Date().toISOString(),
            }
          },
          {
            name: "top_intents",
            filter: {
              projectID: "656cd0725061e600072a209c",
              startTime: startTime.toISOString(),
              endTime: new Date().toISOString(),
            }
          },
          {
            name: "top_slots",
            filter: {
              projectID: "656cd0725061e600072a209c",
              startTime: startTime.toISOString(),
              endTime: new Date().toISOString(),
            }
          },
          {
            name: "understood_messages",
            filter: {
              projectID: "656cd0725061e600072a209c",
              startTime: startTime.toISOString(),
              endTime: new Date().toISOString(),
            }
          },
          {
            name: "unique_users",
            filter: {
              projectID: "656cd0725061e600072a209c",
              startTime: startTime.toISOString(),
              endTime: new Date().toISOString(),
            }
          },
          {
            name: "token_usage",
            filter: {
              projectID: "656cd0725061e600072a209c",
              startTime: startTime.toISOString(),
              endTime: new Date().toISOString(),
            }
          },
        ]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': VOICEFLOW_API,
        }
      })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
    fetchData();
  }, [])

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
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Unique Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Unique Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
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
            <Overview />
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
            <Overview />
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
            <Overview />
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
            <Overview />
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
            <Overview />
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
            <Overview />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}