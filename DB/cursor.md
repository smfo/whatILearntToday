# Cursor

A cursor is a set of transaction-sql logic used to loop over a, predetermined, number of rows.

* Declare and initialize the variable to loop over
* Declare a cursor with a specifiv name and open the cursor
* Fetch a record from the cursor to begin the processing
* Implement loop logic
* Fetch the next record and repeat the two steps above
* Close the cursor
* Deallocate the cursor in order to release all the internal resources the SQL server is holding

```sql
-- Declare and initialize veriables to be used
declare @proveIds table (deliveryId int)
insert @proveIds(deliveryId) values(1578),(1579)

-- This variable will hold the current row fetched by the cursor
declare @proveId int

-- Declare cursor
declare VarCursor cursor for
-- Populate cursor
select deliveryId 
from @proveIds

-- Open cursor
open VarCursor

-- Fetch the next record to start processing
fetch next from VarCursor into @proveId

-- Set cursor status
while @@fetch_status = 0

begin

-- For every row in cursor, do stuff

-- Fetch the next record
fetch next from VarCursor into @proveId

end

-- Close and deallocate cursor
close VarCursor
deallocate VarCursor
```

Cursors can also be used for different purposes. It is possible, among other things, to move backwards and forwards between records.