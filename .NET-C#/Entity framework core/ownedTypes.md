
# Owned types
These are types that we want to use to save data in the tables, however we do not want them
to be their own table. They do not have an Id, and can be used across multiple tables.\
NB: see changes from EF Core 2 to EF Core 3.

```C#
public class PersonName
{
    public PersonName(string givenName, string surName)
    {
        SurName = surName;
        GivenName = givenName;
    }

    public string SurName { get; private set; }
    public string GivenName { get; private set; }
    public string FullName => $"{GivenName} {SurName}";
    public string FullNameReverse => $"{SurName}, {GivenName}";

}
```

Use the owned type like any other type in the enity model.
```C#
// In the User model
public PersonName Name { get; set;}
```

Data is added like any other type, while fulfilling the requirements set by the type itself (required 
constructor values).

```C#
User user = new User()
{
    Name = new PersonName("First", "Last")
}
```
NB: Before EF Core 3, it is not possible to instanciate an entity with an empty owned type. See pluralsight
for work around.

And can be queries like so.
```C#
_context.Users.Where(x => x.Name.GivenName == "First");
```

For this to be accepted of EF Core as a owned type, and not a regular table with a relationship to User,
it has to be defined in the OnModelCreating function in the DbContext.
```C#
// This tells EF Core that the type used for Name in User is not an entity
modelBuilder.Entity<User>().OwnsOne(s => s.Name);
```

**Shadow property**\
The owned type will be treated as any other table until it is saved my EF Core, therefore they will also
register as changed entities which will lead to an error it trying to modify shadow properties of all
tables. See shadowProperties for how to solve this.


## Initiating
EF Core needs a constructor a parameterless constructor in order to get query results. In this example we do not
want the users to be able to add a type PersonName without adding a given and last name. To solve this
add a private paranterless constructor for EF Core to use, that users cannot access.\
```private PersonName(){}```

## Naming
The columns from the owned type will be added directly to the entity table. The name will by default be
NameOfTheFieldUsingTheType_NameOfOwnedTypeField. So here it would be ```Name_GivenName```. This can
be overridden when defining the owned type in the context.
```C#
modelBuilder.Entity<User>().OwnsOne(s => s.Name).Property(b => b.GivenName).HasColumnName("GivenName");
modelBuilder.Entity<User>().OwnsOne(s => s.Name).Property(b => b.LastName).HasColumnName("LastName");
```
This needs to be done seperatly for all fields in the type.