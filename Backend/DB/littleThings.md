
# Little database tips

## Rollback

Use `rollback` to test how a command will change the database. The transaction will not be saved in the database and can be rolled back if the result is not as expected.

The command can only be used to undo changes to the last commited state.