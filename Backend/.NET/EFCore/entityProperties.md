# EF Core entity properties

## Index
The keyword for an index is `HasIndex`.\
If the field specified in the index must be unique, that is determined by the extension `IsUnique`. If this is not present, the indexed field can contain the same value for multiple rows in the entity table.\
To decrease the lookuptime of the index you can also specify a filter. This allows you to index only a subset of the columns values.

```C#
entity.HasIndex(e => e.Shortname, "UQ_Event_Shortname")
                .IsUnique()
                .HasFilter("([Shortname] IS NOT NULL)");
```

