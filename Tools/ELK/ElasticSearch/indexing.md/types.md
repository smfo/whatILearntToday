
# Field types
What type will a specfic field get in the ES index and what is the difference.

## Storing of strings
There are two types that can be used for storing of string data, text and keyword. 

### Text
Text types, unlike keyword types, are analyzed at the time of indexing. Meaning text fields are 
broken down into their individual terms at indexing. This allows for partial matching.

The phrase "roosters crow everyday" would be indexed as "roosters", "crow", "everyday". Any of these words
would be a partial match.

One of the consequenses of this is that text types cannot be sorted alphabetically.

### Keyword
Keyword types are indexed as they are, not broken down like text types. Meaning they need exact matches,
whereas text types allow for partial matches.

The phrase "roosters crow everyday" would be indexed as "roosters crow everyday", and would only match
queries with that exact phrase.

```C#
PUT demo_index
{
    "mappings": {
        "_doc": {
            "properties": {
                "state": {
                    "type": "keyword"
                },
                "product_description": {
                    "type": "text"
                }
            }
        }
    }
}
```

## Nested
Normally data in ES documents are flattened, because ES has no concept of inner objects. 

```C#
PUT my_index/_doc/1
{
  "group" : "fans",
  "user" : [ 
    {
      "first" : "John",
      "last" :  "Smith"
    },
    {
      "first" : "Alice",
      "last" :  "White"
    }
  ]
}
```
This would be saved internaly in ES like so:
```C#
{
  "group" :        "fans",
  "user.first" : [ "alice", "john" ],
  "user.last" :  [ "smith", "white" ]
}
```
Meaning that the connection between fields in the same object in the array is lost.\
This leads to the document matching queries it should not.
```C#
GET my_index/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "user.first": "Alice" }},
        { "match": { "user.last":  "Smith" }}
      ]
    }
  }
}
```

To maintain the array indepencense of each object array, use nested as a datatype.
```C#
PUT my_index
{
  "mappings": {
    "properties": {
      "user": {
        "type": "nested" 
      }
    }
  }
}
```
The data will not give hits for the first query, while the second will give one hit.
```C#
GET my_index/_search
{
  "query": {
    "nested": {
      "path": "user",
      "query": {
        "bool": {
          "must": [
            { "match": { "user.first": "Alice" }},
            { "match": { "user.last":  "Smith" }} 
          ]
        }
      }
    }
  }
}

GET my_index/_search
{
  "query": {
    "nested": {
      "path": "user",
      "query": {
        "bool": {
          "must": [
            { "match": { "user.first": "Alice" }},
            { "match": { "user.last":  "White" }} 
          ]
        }
      },
      "inner_hits": { 
        "highlight": {
          "fields": {
            "user.first": {}
          }
        }
      }
    }
  }
}
```