"use client"

import { ModeToggle } from '@/components/ModeToggle'
import { BarChartStacked } from '@/components/charts/BarChartStacked'
import { GradientGraph } from '@/components/charts/GradientGraph'
import { LineChartMultiple } from '@/components/charts/LineChartMultiple'
import { DataTable } from '@/components/table/DataTable'
import { columns, PurchaseType } from '@/components/table/columns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as React from 'react'


export const dynamic = 'force-dynamic'


const users = [
    { id: '287496', name: 'Lynn Steward' },
    { id: '324277', name: 'Grace Hawkins' },
    { id: '412000', name: 'Stacey Austin' },
    { id: '464377', name: 'Abigail Stone' }
]



export default function Home() {
    const [userID, setUserID] = React.useState('287496')
    const [data, setData] = React.useState<{ purchases: PurchaseType[] }>({ purchases: [] })


    React.useEffect(() => {
        fetch(`http://localhost:3000/api/purchases?id=${userID}`)
            .then((res) => res.json())
            .then((data: { purchases: PurchaseType[] }) => setData(data))
    }, [userID])


    return (
        <div className='flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
            <ModeToggle />

            <div>
                <Select value={userID} onValueChange={setUserID}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="User" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        {users.map((user) => {
                            return (
                                <SelectItem value={user.id} key={user.id} className="rounded-lg">{user.name}</SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </div>


            <main className="flex flex-row gap-8">
                <GradientGraph chartData={data.purchases} />
                <BarChartStacked chartData={data.purchases} />
                <LineChartMultiple chartData={data.purchases} />
            </main>


            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data.purchases} />
            </div>
        </div>
    )
}
