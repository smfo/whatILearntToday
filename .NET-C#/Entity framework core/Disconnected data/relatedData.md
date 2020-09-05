# Updating related data

## One to many
Want to update the related data without also updating the main entity. Or the, possible, other entities
attached to the main entity.\

Set the state of the related data to modified. This prevents all the related data (all the quotes) of the 
data object (samurai) from being updated and only updates the specific instance. It also prevents the main
entity (samuari) from being updated.

```C#
private static void ModifyingRelatedDataWhenNotTracked()
{
    var samurai = _context.Samurais.Include(s => s.Quotes).FirstOrDefault(s => s.Id == 2);
    var quote = samurai.Quotes[0];
    quote.Text = "Did you hear that again?";
    using (var newContext = new SamuraiContext())
    {
        newContext.Entry(quote).State = EntityState.Modified;
        newContext.SaveChanges();
    }
}
```

Using
```C#
newContext.Quotes.Update(quote);
```
would have updated all the quotes, not just the first one.

While using Attach would have set all the data to unmodified. They all already exist and have FK
keys and ids so nothing would have happened.