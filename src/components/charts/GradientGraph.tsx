"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const chartConfig = {
    purchases: {
        label: "Purchases",
    },
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

interface Purchases extends Array<Purchase> {}

interface GradientGraphProps {
    chartData: Purchases
}


export const GradientGraph = ({ chartData }: GradientGraphProps ) => {
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
                    <CardTitle>Area Chart - Interactive</CardTitle>
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
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillGrocery" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-grocery)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-grocery)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillShopping" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-shopping)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-shopping)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillFood" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-food)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-food)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillTransport" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-transport)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-transport)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillHealth" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-health)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-health)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="trans_date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
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
                        <Area
                            dataKey="grocery"
                            type="natural"
                            fill="url(#fillGrocery)"
                            stroke="var(--color-grocery)"
                            stackId="a"
                        />
                        <Area
                            dataKey="shopping"
                            type="natural"
                            fill="url(#fillShopping)"
                            stroke="var(--color-shopping)"
                            stackId="a"
                        />
                        <Area
                            dataKey="food"
                            type="natural"
                            fill="url(#fillFood)"
                            stroke="var(--color-food)"
                            stackId="a"
                        />
                        <Area
                            dataKey="transport"
                            type="natural"
                            fill="url(#fillTransport)"
                            stroke="var(--color-transport)"
                            stackId="a"
                        />
                        <Area
                            dataKey="health"
                            type="natural"
                            fill="url(#fillHealth)"
                            stroke="var(--color-health)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
