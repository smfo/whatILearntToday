
// Normally a value type cannot be assigned a null value (int, boolean, long, double, DateTime),
// as this will result in a runtime error. This can be changed by declearing the type as a nullable
// type. A nullable type can represent the "correct" range of values for its underlying value type,
// in addition to the null value.

[Serializable]
public struct Nullable<T> where T : struct
{        
    public bool HasValue { get; }
      
    public T Value { get; }
        
    // other implementation
}

// a nullable int is decleared like so

Nullable<int> i = null;
if(int.HasValue) Console.WriteLine(i.Value) //or Console.WriteLine(i)

// Trying to access the NullableType.value will throw async runtime exception if the value is nullor not
// assigned any value

// The operator '?' can be used as a shorthand syntax for Nullable<T>
int? i = null;
bool? b = null;

// Nullable types can only be used with value types
// The value property will throw a InvalidOperationException if the value is null
// HasValue returns true if the variable dontains a value, false if it is null
// You can only use == and != operators with nullable types, For other comparisions
// use the Nullable static class (Nullable.Compare<T>)
// Nested Nullable types are not allowed


// Boolean - bool vs bool?
// bool is async value type and cannot be null, the nullable type allows to wrap value types,
// and being able to assign null to them.
// bool? can contain three different types, true, false and null,
// whereas bool only can contain true or false and will default to false if not given a value
// Use if you want to know whether there has been an assignment made to the variable or not,
// bool if no good for this as false will be assigned at default