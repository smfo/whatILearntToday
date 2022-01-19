
# Delete permanently

Not everything in Azure is deleted permanently even when you think it is. This applies to accounts, blob stores and key vaults, among others(?).\
These resources are first "soft-deleted", meaning they are no longer visible to all users, but they are still kept in Azure and you still pay for them!

By default soft-deleted resources are permanently deleted, purged, after 90 days. This interval can be changed to as little as 7 in the settings. You can also purge them manually. To do this you need a user that has purge rights, these are also the only users who can see the soft-deleter resources when they are in this state.

Purge in the cli
```az keyvault purge --keyvaultName```

Or in the portal: chose the keyvault overview and click "manage deleted vaults" at the top. Here you can chose to restore or purge the keyvault.

With an account and storage account you are not guaranteed that no one else has created a new one using the same name. In that case your resource cannot be restored.