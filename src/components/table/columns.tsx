'use client'

import { ColumnDef } from "@tanstack/react-table"



export type PurchaseType = {
    customer_ID: number
    trans_date: string
    food: number
    grocery: number
    health: number
    shopping: number
    transport: number
}


export const columns: ColumnDef<PurchaseType>[] = [
    {
        accessorKey: "customer_ID",
        header: "Customer ID",
    },
    {
        accessorKey: "trans_date",
        header: "Date",
        cell: ({ row }) => <div>{(new Date(row.getValue("trans_date"))).toLocaleString('en-GB').split(',')[0]}</div>
    },
    {
        accessorKey: "food",
        header: "Food",
        cell: ({ row }) => <div>{row.getValue("food") !== 0 ? (row.getValue("food") as Number).toFixed(2) : 0}</div>
    },
    {
        accessorKey: "grocery",
        header: "Grocery",
        cell: ({ row }) => <div>{row.getValue("grocery") !== 0 ? (row.getValue("grocery") as Number).toFixed(2) : 0}</div>
    },
    {
        accessorKey: "health",
        header: "Health",
        cell: ({ row }) => <div>{row.getValue("health") !== 0 ? (row.getValue("health") as Number).toFixed(2) : 0}</div>
    },
    {
        accessorKey: "shopping",
        header: "Shopping",
        cell: ({ row }) => <div>{row.getValue("shopping") !== 0 ? (row.getValue("shopping") as Number).toFixed(2) : 0}</div>
    },
    {
        accessorKey: "transport",
        header: "Transport",
        cell: ({ row }) => <div>{row.getValue("transport") !== 0 ? (row.getValue("transport") as Number).toFixed(2) : 0}</div>
    }
]
