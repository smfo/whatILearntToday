# Manual changes

If we for some reason want to make a migration manually, create one in the normal way so a .Designer.cs file will be created for you.

After doing this you can manipulate the files as you pleace to make the migration you want.\
NB: If there are changes in the tables or columns, remember to change the `.Designer.cs` and `DbModelSnapshot.cs` file as well!

## Sql in migration

You can add SQL in the migration files like this
```C#
migrationBuilder.Sql("<SQL>");

migrationBuilder.Sql("exec sp_rename 'PK_Delivery', 'PK_Execution';");
```

## sp_rename

Use this function to rename a key/constraint without having to drop and add it. This also saves you having to drop all constraints that depends on the PK before being allowed to drop it.

```C#
migrationBuilder.Sql("exec sp_rename 'OldName', 'NewName';");

migrationBuilder.Sql("exec sp_rename 'PK_Delivery', 'PK_Execution';");
```