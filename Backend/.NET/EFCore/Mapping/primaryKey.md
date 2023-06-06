# Primary key

In the mapping we can either ask ef core to generate a key for us when the row is added, thus field has to exist in the model, or we can define one of our fieldvalues as out PK.

```C#
public class DeliverySet
	{
		public string Id { get; set; }
        ...
	}
```

In DBContext
```C#
modelBuilder.Entity<DeliverySet>()
			.Property(l => l.Id)
			.ValueGeneratedOnAdd();
```

Define a fields we want to add our own value to as PK.

```C#
public class Delivery
{
	public string DeliverySetId { get; set; }
    ...
}
```

In DBContext
```C#
modelBuilder.Entity<Delivery>()
			.HasKey(d => d.DeliverySetId);
```

You can define a table without a key using `HasNoKey`, however that has other consequenses for that table that I don't know.

## Combination key

Add a combinationkey from existing fields like this

```C#
modelBuilder.Entity<Losningsprosent>()
			.HasKey(l => new {l.DeliverySetId, l.OppgavePosisjon});
```