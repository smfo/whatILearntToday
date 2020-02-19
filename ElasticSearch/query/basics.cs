
// A basic query that askes for all the documents in the bank index
GET /bank/_search
{
  "query": { "match_all": {} },
  "sort": [
    { "account_number": "asc" }
  ]
}


{
  "took" : 63,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
        "value": 1000,
        "relation": "eq"
    },
    "max_score" : null,
    "hits" : [ {
      "_index" : "bank",
      "_type" : "_doc",
      "_id" : "0",
      "sort": [0],
      "_score" : null,
      "_source" : {"account_number":0,"balance":16623,"firstname":"Bradshaw","lastname":"Mckenzie","age":29,"gender":"F","address":"244 Columbus Place","employer":"Euron","email":"bradshawmckenzie@euron.com","city":"Hobucken","state":"CO"}
    }, {
      "_index" : "bank",
      "_type" : "_doc",
      "_id" : "1",
      "sort": [1],
      "_score" : null,
      "_source" : {"account_number":1,"balance":39225,"firstname":"Amber","lastname":"Duke","age":32,"gender":"M","address":"880 Holmes Lane","employer":"Pyrami","email":"amberduke@pyrami.com","city":"Brogan","state":"IL"}
    }, ...
    ]
  }
}

// from the response to the query (by default the number of documents displayed in hits is 10)
// took: how long it took ES to run the query, in ms 
// timed_out: did the search request time out 
// _shards: how many shards were searched, with details (a shard is a piece of your data)
// max_score: the score of the most relevant document found
// hits.total.value: number of matching documents found
// refering to one document in the hits list
// hits.sort: document's sort position (when not sorting by relevance score)
// hits._score: the document's relevance score

// get hits 10-19 where the address field matches "mill lane"
GET /bank/_search
{
  "query": { "match": { "address": "mill lane" } },
  "sort": [
    { "account_number": "asc" }
  ],
  "from": 10,
  "size": 10
}



GET /bank/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "age": "40" } }
      ],
      "must_not": [
        { "match": { "state": "ID" } }
      ]
    }
  }
}
// must match: required
// shoud match: desirable
// must not match: undesierable

// these are boolean queries and affects the documents relevance score¨
// the higher the score the better the document matches the search criteria and
// the higher on the hits list it is placed (default behaviour)



// there are two types of queries
// Leaf query clauses: these look for a particular value in a particular field, 
// ex. match, term, range. these queries can be used by themselves
// Compound query clauses: wrap other leaf or compound queries and are used to 
// combine multiple queries to alter their behavior. ex. bool, dis_max


// relevance score
// measure how well each document matches the query, the higher the _score the more
// relevant the document is for the search. each query type can calculate the scores
// differently, but the score calculation also depends on weather the query clause is 
// run in a query or filter context

// query and filter context
// in query context, the query clause answer the question
// "how does this document match this query clause?", in addition to this the query clause
// also calculates a relevant score in the _score meta-field
// we have a query context every time a query clause is passed to a query parameter
// in a filter context the query clause answers the question
// "Does this document match this query clause?", this gives a yes/no answer, no score is calculated
// we have a query context whenever a query clause id passed to a filter parameter, such as 
// filter or must_not


GET /_search
{
  "query": {   // 1
    "bool": {  // 2
      "must": [
        { "match": { "title":   "Search"        }},
        { "match": { "content": "Elasticsearch" }}
      ],
      "filter": [ // 3
        { "term":  { "status": "published" }},
        { "range": { "publish_date": { "gte": "2015-01-01" }}}
      ]
    }
  }
}

// conditions asked in this query
// The title field contains the word search.
// The content field contains the word elasticsearch.
// The status field contains the exact word published.
// The publish_date field contains a date from 1 Jan 2015 onwards

// 1: the query parameter inducates a query context
// 2: the bool and the match clauses are used in query context, which means they are used
// to score how well each document matches the criteria
// 3: the filter parameter indicates filter context. its term and range clause are used
// in filter context. they will filter out documents which does not match, nowever they
// will not affect the score for the matching documents

// (isn't it better to filter first, so you don't have to calculate the score for the
// documents that are filtered out?)

// note: 
// Use query clauses in query context for conditions which should affect the score of matching 
// documents (i.e. how well does the document match), and use all other query clauses in filter context.