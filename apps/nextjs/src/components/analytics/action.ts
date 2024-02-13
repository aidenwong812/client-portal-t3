"use server";

import axios from "axios";
import { format } from "date-fns"

export const getAnalyticsData = async (period: string) => {
  const VOICEFLOW_API = process.env.NEXT_PUBLIC_VOICEFLOW_API

  const startTime = new Date()
  const endTime = new Date()
  startTime.setDate(endTime.getDate() - parseInt(period))

  const total = await axios.post("https://analytics-api.voiceflow.com/v1/query/usage", {
    query: [
      {
        name: "interactions",
        filter: {
          projectID: "656cd0725061e600072a209c",
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        }
      },
      {
        name: "sessions",
        filter: {
          projectID: "656cd0725061e600072a209c",
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        }
      },
      {
        name: "unique_users",
        filter: {
          projectID: "656cd0725061e600072a209c",
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        }
      },
    ]
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': VOICEFLOW_API,
    }
  })

  const interactions = []
  const sessions = []
  const top_intents = []
  const understood_messages = []
  const unique_users = []
  const tokens = []

  endTime.setDate(endTime.getDate() - parseInt(period) + 1)

  for (let index = 0; index < parseInt(period); index++) {
    const detail = await axios.post("https://analytics-api.voiceflow.com/v1/query/usage", {
      query: [
        {
          name: "interactions",
          filter: {
            projectID: "656cd0725061e600072a209c",
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
          }
        },
        {
          name: "sessions",
          filter: {
            projectID: "656cd0725061e600072a209c",
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
          }
        },
        {
          name: "top_intents",
          filter: {
            projectID: "656cd0725061e600072a209c",
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
          }
        },
        {
          name: "understood_messages",
          filter: {
            projectID: "656cd0725061e600072a209c",
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
          }
        },
        {
          name: "unique_users",
          filter: {
            projectID: "656cd0725061e600072a209c",
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
          }
        },
        {
          name: "token_usage",
          filter: {
            projectID: "656cd0725061e600072a209c",
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
          }
        },
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': VOICEFLOW_API,
      }
    })

    interactions.push({
      name: format(endTime, 'LLL d'),
      total: detail.data.result[0].count,
    })
    sessions.push({
      name: format(endTime, 'LLL d'),
      total: detail.data.result[1].count,
    })
    top_intents.push({
      name: format(endTime, 'LLL d'),
      total: detail.data.result[2].intent,
    })
    understood_messages.push({
      name: format(endTime, 'LLL d'),
      total: detail.data.result[3].total.total ? (detail.data.result[3].total.total - detail.data.result[3].missed.total) / detail.data.result[3].total.total : 0,
    })
    unique_users.push({
      name: format(endTime, 'LLL d'),
      total: detail.data.result[4].count,
    })
    tokens.push({
      name: format(endTime, 'LLL d'),
      total: detail.data.result[3].tokens,
    })

    startTime.setDate(startTime.getDate() + 1)
    endTime.setDate(startTime.getDate() + 1)
  }

  return {
    total: {
      interactions: total.data.result[0].count,
      sessions: total.data.result[1].count,
      unique_users: total.data.result[2].count
    },
    interactions: interactions,
    sessions: sessions,
    top_intents: top_intents,
    understood_messages: understood_messages,
    unique_users: unique_users,
    tokens: tokens,
  }
}