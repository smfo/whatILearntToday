# Default subscription

When you are logged in in azure in the cli, you will be assigned a default aubscription. This will be one of the subscriptions assosiated with your account.

Not all subscriptions have access to all resources, therefore you will need to change this some times.

To check which subscription youre using type
```
az account list
```
this will list all your subscriptions, one of them will have `isDefault: true`.

To change default type
```
az account set --subscription <SubscriptionName>
```