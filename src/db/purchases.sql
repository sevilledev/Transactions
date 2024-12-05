CREATE DATABASE Transactions;
use Transactions;

SELECT * FROM Purchases;

SELECT [trans_date_trans_time] FROM Purchases;

UPDATE Purchases
SET trans_date_trans_time = REPLACE(trans_date_trans_time, '/', '-')
WHERE trans_date_trans_time LIKE '%/%';

UPDATE Purchases
SET dob = REPLACE(dob, '/', '-')
WHERE dob LIKE '%/%';

UPDATE Purchases
SET job = REPLACE(job, ',', '')
WHERE job LIKE '%,%';

UPDATE Purchases
SET merchant = REPLACE(merchant, '"', '')
WHERE merchant LIKE '%"%';

SELECT [dob] FROM Purchases
GROUP BY dob;

SELECT [dob], [job] FROM Purchases
GROUP BY dob, job;

ALTER TABLE Purchases ADD customer_ID int;

--- Fill customer_id with random generated ids 

WITH Customer AS (
    SELECT DISTINCT 
           dob,
           ABS(CHECKSUM(NEWID())) % 1000000 AS customer_id
    FROM Purchases
)

UPDATE Purchases
SET Purchases.customer_id = Customer.customer_id
FROM Purchases
INNER JOIN Customer ON Purchases.dob = Customer.dob;

ALTER TABLE Purchases
ALTER COLUMN dob DATE;

--- 


UPDATE Purchases
SET dob = CONVERT(DATE, dob, 103);

EXEC sp_rename 'Purchases.trans_date_trans_time',  'trans_datetime', 'COLUMN';

ALTER TABLE Purchases
ALTER COLUMN trans_datetime DATETIME;

UPDATE Purchases
SET trans_datetime = CONVERT(DATETIME, trans_datetime, 103);


--- Views ---

SELECT customer_ID, trans_datetime, category, amt FROM Purchases
WHERE customer_id = '6726'
ORDER BY trans_datetime;


SELECT * FROM Purchases
ORDER BY trans_datetime;


SELECT
    Purchases.customer_id,
	Purchases.dob,
    CAST(Purchases.trans_datetime AS DATE) AS trans_date,
    STRING_AGG(Purchases.category, ', ') AS categories
FROM Purchases
WHERE CAST(Purchases.trans_datetime AS DATE) BETWEEN '2019-01-01' AND '2024-12-31'
GROUP BY Purchases.customer_id, CAST(Purchases.trans_datetime AS DATE), Purchases.dob
ORDER BY Purchases.customer_id, CAST(Purchases.trans_datetime AS DATE);

--- Distinct categories per user and trans_date

WITH CustomersPurchases AS (
	SELECT DISTINCT
		customer_id,
        CAST(trans_datetime AS DATE) AS trans_datetime,
        category
	FROM Purchases
)

--- SELECT * FROM CustomerPurchases;

SELECT
    customer_id,
    CAST(trans_datetime AS DATE) AS trans_date,
    STRING_AGG(category, ', ') AS categories
FROM CustomersPurchases
GROUP BY customer_id, CAST(trans_datetime AS DATE)
ORDER BY customer_id, CAST(trans_datetime AS DATE);


--- Main View ---

WITH CustomerPurchases AS (
	SELECT 
		customer_ID,
		CONVERT(DATE, trans_datetime) AS trans_datetime,
        category, 
        SUM(amt) AS total_spent
    FROM Purchases
	WHERE customer_ID = '163391'
    GROUP BY customer_ID, CONVERT(DATE, trans_datetime), category
)

SELECT 
    customer_ID,
	CONVERT(DATE, trans_datetime) AS trans_datetime,
    ISNULL([grocery_net], 0) AS grocery,
    ISNULL([shopping_net], 0) AS shopping,
    ISNULL([food_dining], 0) AS food,
    ISNULL([gas_transport], 0) AS transport,
	ISNULL([health_fitness], 0) AS health
FROM CustomerPurchases
PIVOT (
	SUM(total_spent)
    FOR category IN ([grocery_net], [shopping_net], [food_dining], [gas_transport], [health_fitness])
) AS PivotTable;

--- End Of Main View ---


--- Other Views ---

SELECT customer_ID
FROM Purchases
GROUP BY customer_ID
ORDER BY customer_ID;


SELECT CAST(trans_datetime AS DATE)
FROM Purchases
GROUP BY CAST(trans_datetime AS DATE)
ORDER BY CAST(trans_datetime AS DATE);


SELECT * FROM Purchases
WHERE CAST(trans_datetime AS DATE) BETWEEN '2020-12-01' AND '2020-12-31' 
ORDER BY trans_datetime;

--- Other Views ---