# Named exports vs default exports

ES6 provides two ways to export modules from a file, as a named export or as a default export.

The default export if the main export of the file, however it is possible to have both default and named exports in the same file.

## Named exports

Exports a small portion of the file, a specific function or constant. This metod allow for multiple exports from the same file.

```javascript
export const dogText = () => {
  const text = "The name of the dog is: ";

  return { name: text };
};

export const Dog = () => {
  return <Text>Yuki</Text>;
};
```

These exports have to be imported in brackets and the name has to be the exact same as in the original file.

```javascript
import { dogText, Dog } from "./animals";
// import * as DogComponents from './animals';
// use DogComponents.Dog and DogComponent.dogText

export function PrintDog() {
  const { name } = DogName();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ShelfList />
      <Text>{dogText().name}</Text>
      // <Text>{name}</Text>
      <Dog />
    </View>
  );
}
```

## Default exports

There can only be one default export per file. The import has to specify a name that is not surounded by brackets and where the file is from. Because there can only
be one default export per file, the name in the imports can be anything.

```javascript
// export
const MyComponent = () => {};
export default MyComponent;

// import
import MyDefaultComponent from "./MyDefaultExport";
```
