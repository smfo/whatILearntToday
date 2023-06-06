# Relationships 2

A relationship needs to be defined both in the models of the entities and in the DBContext.

In the model we have to add an FK if we want it, and a type of the entity we want to have a relationship with. This will not be a part of the table, but we need it in the code.\
Use an object for a one-to-x relationship and a list for a many-to-x relationship.

Delivery has one DeliverySet
```C#
public class Delivery
{
	public string EpsDeliveryId { get; set; } // FK
	public DeliverySet DeliverySet { get; set; }
}
```

DeliverySet has many Deliveries and no FK
```C#
public class DeliverySet
	{
		public List<Delivery> Delivery { get; set; }
	}
```

## Adding relationship to DBContext

When modeling the relationships we use `HasOne`, `HasMany`, `WithOne`, `WithMany`.\
You start with an entity, it `Has...`, the entity you refer to here use `With...`.

Example: One delivery `HasOne` DeliverySet, `WithMany` deliveries.
```C#
modelBuilder.Entity<Delivery>()
			.HasOne(l => l.DeliverySet)
			.WithMany(d => d.Delivery)
			.HasForeignKey(l => l.DeliverySetId);
```

This is the same as
```C#
modelBuilder.Entity<DeliverySet>()
			.HasMany(l => l.Delivery)
			.WithOne(d => d.DeliverySet)
			.HasForeignKey(l => l.DeliverySetId);
```

### Foreign key

In the example above, EF Core automatically knows that it is the entity on the many end that has the foreign key. That is not the case when we have a one-to-one relationship. In that case we have to specify which model we want to use.

```C#
modelBuilder.Entity<DeliverySet>()
			.HasOne(l => l.Delivery)
			.WithOne(d => d.DeliverySet)
			.HasForeignKey<Delivery>(l => l.DeliverySetId);
```
Is equivalient to
```C#
modelBuilder.Entity<Delivery>()
			.HasOne(l => l.DeliverySet)
			.WithOne(d => d.Delivery)
			.HasForeignKey<Delivery>(l => l.DeliverySetId);
```