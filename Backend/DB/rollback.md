# Rollback

Use `rollback` to test how a transaction will change the database. The transaction will not be commited in the database and can be rolled back if the result is not as expected.

The command can only be used to undo changes to the last commited state.

If one query in a transaction fails, all the queries in the transaction are rolledback. If you do not use transactions this will not be the case, all queries up until the failing point will execute.

```SQL
-- If the update fails, the insert will still be executed
INSERT INTO Books 
VALUES (15, 'Book15', 'Cat5', 2000)

UPDATE Books
SET price = '25 Hundred' WHERE id = 15

DELETE from Books
WHERE id = 15
```

```SQL
-- Using transactions
BEGIN TRANSACTION
 
  INSERT INTO Books 
  VALUES (20, 'Book15', 'Cat5', 2000)
 
  UPDATE Books
  SET price = '25 Hundred' WHERE id = 20
 
  DELETE from Books
  WHERE id = 20
 
COMMIT TRANSACTION
```

## Rollback on conditions

You can also chose to manually rollback a transaction on certain conditions.

```SQL
DECLARE @BookCount int
 
BEGIN TRANSACTION AddBook
 
  INSERT INTO Books
  VALUES (20, 'Book15', 'Cat5', 2000)
 
  SELECT @BookCount = COUNT(*) FROM Books WHERE name = 'Book15'
 
 -- Chose to rollback of commit the transaction
  IF @BookCount > 1
    BEGIN 
      ROLLBACK TRANSACTION AddBook
      PRINT 'A book with the same name already exists'
    END
  ELSE
    BEGIN
      COMMIT TRANSACTION AddStudent
      PRINT 'New book added successfully'
    END
```

## Implicit transaction

In sql tools we can have implicit transactions turned off. This means that the transaction does not need to be inside a transaction command to commit, it does so automatically.\
Meaning, if the transaction is executed it cannot be rolledback.

Benefits of this is that we do not leave open transactions, locking rows in the database.

You can chose to use `begin - rollback`, to make it possible to rollback instead of commiting the transaction.

```SQL
-- If everything goes well, this transaction will commit if set implicit transaction is disabled
INSERT INTO Books 
VALUES (15, 'Book15', 'Cat5', 2000)

UPDATE Books
SET price = '25 Hundred' WHERE id = 15

DELETE from Books
WHERE id = 15
```

The opposite of this is explicit transactions where every transaction has to begin with `begin transaction` and end with `commit transaction` or `rollback transaction`.

## Transaction name

We do not have to use `transaction` as we have in all the examples above, we can use custom names. This makes it possible to refer to a specific transaction in a query.

```SQL
DECLARE @TransactionName VARCHAR(20)= 'Demotran1';

BEGIN TRAN @TransactionName;  
INSERT INTO Demo
VALUES(1), (2);  
ROLLBACK TRAN @TransactionName;

SELECT *
FROM demo;

DECLARE @TransactionName1 VARCHAR(20)= 'Demotran2';

BEGIN TRAN @TransactionName;  
INSERT INTO Demo
VALUES(1), (2);  
COMMIT TRAN @TransactionName1;

SELECT *
FROM demo;
```