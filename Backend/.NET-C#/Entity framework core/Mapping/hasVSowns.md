# Has vs owns

Exampe of Has
```C#
modelBuilder.Entity<ScoredItemResult>()
			.HasOne(op => op.ScoredExecution)
			.WithMany(l => l.ItemResults)
			.HasForeignKey(op => op.ScoredExecutionId);
```

Example of Owns
```C#
modelBuilder.Entity<Execution>()
			.OwnsOne(delivery => delivery.IrtAnalyseData)
			.WithOwner(irtAnalyseData => irtAnalyseData.Execution);
```

Som etimes you want to define properties that are only ever available through navigation via another entity. These are called owned entity types.\
The entity that contains it is owner.

Owned properties are a part of the owner and cannot exist without it. They are essentially the same as aggregates.

Example: In the workout app (without statistics), a session cannot exist without a workoutDay. And there is no scenario where I would want to access a session without going via the day. Whereas you might want to access an exercise without going via the day, for example in an exercises bank.

Creating this schema

```C#
modelBuilder.Entity<WorkoutDay>()
    .OwnsMany(day => day.Sessions)
    .WithOwner(session => session.WorkoutDay);

modelBuilder.Entity<WorkoutDay>()
    .HasMany(day => day.Exercise)
    .WithMany(ex => ex.WorkoutDay)
```

## Querying

Entities declared with WithMany (Owns) will not be automatically included in the query. Use `AutoInclude` for this.\
Whereas OwnsMany will include the owned entities by default when querying the owner from the database.

## Owner type fun facts

* You cannot create DbSets of owned types.
* An owned type cannot be shared by multiple owners