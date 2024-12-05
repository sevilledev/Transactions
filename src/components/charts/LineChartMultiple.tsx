"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



const chartConfig = {
    grocery: {
        label: "Grocery",
        color: "hsl(var(--chart-1))",
    },
    shopping: {
        label: "Shopping",
        color: "hsl(var(--chart-2))",
    },
    food: {
        label: "Food",
        color: "hsl(var(--chart-3))",
    },
    transport: {
        label: "Transport",
        color: "hsl(var(--chart-4))",
    },
    health: {
        label: "Health",
        color: "hsl(var(--chart-5))",
    }
} satisfies ChartConfig


interface Purchase {
    trans_date: string
    grocery: number
    shopping: number
    food: number
    transport: number
    health: number
}

interface Purchases extends Array<Purchase> { }

interface GradientGraphProps {
    chartData: Purchases
}


export const LineChartMultiple = ({ chartData }: GradientGraphProps) => {
    const [timeRange, setTimeRange] = React.useState("7d")

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.trans_date)
        const referenceDate = new Date("2020-12-31")
        let daysToSubtract = 30
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })


    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Line Chart - Multiple</CardTitle>
                    <CardDescription>Showing total purchases for the last 1 months</CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={filteredData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="trans_date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Line
                            dataKey="grocery"
                            type="monotone"
                            stroke="var(--color-grocery)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="shopping"
                            type="monotone"
                            stroke="var(--color-shopping)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="food"
                            type="monotone"
                            stroke="var(--color-food)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="transport"
                            type="monotone"
                            stroke="var(--color-transport)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="health"
                            type="monotone"
                            stroke="var(--color-health)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
