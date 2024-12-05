import { NextRequest, NextResponse } from 'next/server'
import sql from 'mssql'


const config = {
    server: 'Asus-Prime',
    database: 'master',
    user: 'sevil',
    password: '40470',
    options: { encrypt: false }
}


export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')


    try {
        await sql.connect(config)

        const query = `
            use Transactions;

            WITH CustomerPurchases AS (
                SELECT 
                    customer_ID,
                    CONVERT(DATE, trans_datetime) AS trans_date,
                    category, 
                    amt
                FROM Purchases
                WHERE customer_ID = ${id}
            )

            SELECT
                customer_ID,
                trans_date,
                ISNULL([grocery_net], 0) AS grocery,
                ISNULL([shopping_net], 0) AS shopping,
                ISNULL([food_dining], 0) AS food,
                ISNULL([gas_transport], 0) AS transport,
                ISNULL([health_fitness], 0) AS health
            FROM CustomerPurchases
            PIVOT (
                SUM(amt)
                FOR category IN ([grocery_net], [shopping_net], [food_dining], [gas_transport], [health_fitness])
            ) AS PivotPurchases
            ORDER BY customer_ID, trans_date;
        `

        const req = new sql.Request()
        const res = await req.query(query)

        return NextResponse.json({ purchases: res.recordset })
    } catch (err) { return NextResponse.json({ err }) }
}