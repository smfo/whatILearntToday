# Security rules

Never trust your client to be doing the right thing! Requests can be modified/faked.
Who will have access to what in Firestore?\
NB! Other rules apply to serverless functions (cloud functions etc), this is covered by IAM.


Pattern: which document are being secured, what are the rules for securing them

Everyone can read and write anything
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          true;
    }
  }
}
```

We nest collections, documents and subcollections. Rules are NOT inheritet future down the tree. So if we want to specify a rule for a collection and all it's subcollections we can use a requesive wildcard `{wildcardname=**}`. When using the recursive wildcard syntax, the wildcard variable will contain the entire matching path segment, even if the document is located in a deeply nested subcollection.

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /books/{bookId} {
      allow read, write: if
          true;
    }
    match /{document=**}{       <-- wildcard for all following paths
        applies to all documents on nesting level and future
    }
  }
}
```

**Variables**\
We can use variables from the path like so (more in Arbitrary database documents section)\
`/books/$(bookId)`

**Types of requests**\
Read (get, list), write (update, delete, create).

**Multiple matches**\
If a request match more than one `match` statement, access will be allowed as long as **any** of the conditions are true.

This example will always grant read and write access.
```
service cloud.firestore {
  match /databases/{database}/documents {
    // Matches any document in the 'cities' collection.
    match /cities/{city} {
      allow read, write: if false;
    }

    // Matches any document in the 'cities' collection or subcollections.
    match /cities/{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Requests

Some of the data we can access from the request include auth (the user, with more info if they are valudated by FireAuth) and the data we want to handle. The actual content is in `request.resource.data.{FieldName}`

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /books/{bookId} {
      allow read, write: if
          user.;
    }
  }
}
```

By using the data fields from the request, we can enforce some rules for the documentles db structure in firestore.

Note that you access the data values that are actually sent in by the client. If you delete something, will you also send in these same fields or do you have to write seperate rules? In this example all rules apply to all types of reading and writing.
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if 
        request.resource.data.title is string &&
        request.resource.data.author is string &&
        request.resource.data.location.size() < 40 &&
        request.resource.data.creator == request.auth.uid;
    }
  }
}
```

## Resources

Documents that are already in the database, not the incoming request data we looked at before. We have the same fields as with the other request: metadata and data.

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /books/{bookId} {
      allow read: if true;
      allow create: if 
        request.resource.data.title is string &&
        request.resource.data.author is string &&
        request.resource.data.location.size() < 40 &&
        request.resource.data.creator == request.auth.uid;
      allow update: if
      	request.resource.data.title is string &&
        request.resource.data.author is string &&
        request.resource.data.location.size() < 40 &&
        request.auth.uid == resource.data.creator &&     <-- using already existing data
        resource.data.creator == resource.data.creator;  <-- field cannot be changed
    }
  }
}
```

**Updating:** we do not have to provide all fields with security/validation rules in each update request. The rules apply to the finished document after updating, so already saved values that we do not allow to be changed, like creator, do not have to be provided.

## Arbitrary database documents

These are documents in the database that are not directly a part of the collection we are trying to access. We can use `exists()` and `get()` to use these in our rules.

For a document, book, with a subcollection, user_data, containing a field of creator and superfans.
```
allow read: if get(/database/$(database)/documents/books/$(bookId)/user_data).data.roles[request.auth.uid] in ["creator", "superfans"]
```

## Security rules as query

Security rules cannot be used to filter out documents for us. If multiple documents are requested, security rules does not have the time or resources to look at the document data individually. Instead it looks at the rules and the query recived, and if a rule **might** be broken as a result of the request, no data is returned.

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /books/{bookId} {
        allow read: if
            rsource.data.status == "published"
     }
  }
}
```

In the case of a `get all books` query, no data will be returned. In the case of a `get all books where status == published` we would get data.

If the query tries to retrive a **single** document, security rules will take the time to check the actual data to see if the client can access to it.

## Custom auth claims

Assign a user a custom claim on the serverside/cloud functions and use this to give user(s) their own security rules

```
allow read, write: if request.auth.token.super_admin = true

allow read write: if request.auth.token.role == "editor"
```

## Functions

We can create functions to reuse rules or make the setup look cleaner

```
service cloud.firestore {
  match /databases/{database}/documents {
    // True if the user is signed in or the requested data is 'public'
    function signedInOrPublic() {
      return request.auth.uid != null || resource.data.visibility == 'public';
    }

    match /cities/{city} {
      allow read, write: if signedInOrPublic();
    }

    match /users/{user} {
      allow read, write: if signedInOrPublic();
    }
  }
}
```

If we declare the function nested in a path that uses some variable we need, typically if the function uses a `get()` method, we can access variable directly. Otherwise, the variable has to be passed as a parameter.


```
service cloud.firestore {
  match /databases/{database}/documents {
    match /books/{bookId} {

        function userCanEditBook(){
            return get(/database/$(database)/documents/books/$(bookId)/user_data).data.roles[request.auth.uid] in ["creator", "superfans"]
        }

        allow update: if userCanEditBook()
    }
  }
}

service cloud.firestore {
  match /databases/{database}/documents {
    match /books/{bookId} {
        allow update: if userCanEditBook(bookId)
    }
    ...

    <!-- Functions -->
    function userCanEditBook(bookId){
    return get(/database/$(database)/documents/books/$(bookId)/user_data).data.roles[request.auth.uid] in ["creator", "superfans"]
    }
  }
}
```

## Example

```
service cloud.firestore {
  match /databases/{database}/documents {
  	match /{document=**}{
  		allow read, write: if 
    		request.auth.token.email_verified;
  		}

    match /books/{bookId} {
      allow read: if true;
      allow create: if 
        isBookFormValid() &&
        request.auth.uid == request.resource.data.creator;
      allow update: if
      	isBookFormValid() &&
        isUserBookCreator() &&
        resource.data.creator == resource.data.creator;
      allow delete: if
      	isUserBookCreator();
    }
  }
    
  function isUserBookCreator(){
  	return request.auth.uid == resource.data.creator;
  }
  
  function isBookFormValid(){
  	return request.resource.data.title is string &&
        request.resource.data.author is string &&
        request.resource.data.location.size() < 40
  }
}
```

## Testing!

Security rules can be tested in the console by clicking `rules playground` to the left of the rules window.

You can chose which type of requst to simulate, which path to use, if you want to use user authentication and (on write requests) build a document to send with the request.

Use the Firebase emulator TODO.