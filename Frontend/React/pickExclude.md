# Pick and Exclude

When we want to use some values from a type/interface and we do not want to define a new type/interface.

```js
type User = {
  id: number;
  name: string;
  location: string;
  registeredAt: Date;
};

// Removes id and registeredAt
Exclude<User, "id" | "registeredAt"> 

// Selects name and location
Pick<User, "name" | "location">
```