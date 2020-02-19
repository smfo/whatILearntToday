
// aggregations allows for collecting meta-information about the search results

// this aggregation groups all the documents in the bank according to state and returns the ten (default) states
// with the most accounts in descending order
GET /bank/_search
{
  "size": 0,
  "aggs": {
    "group_by_state": {
      "terms": {
        "field": "state.keyword"
      }
    }
  }
}


// the buckets in the response are the values of the state field, while the doc-count shows the 
// number of documents in each state
// because the request set size=0, only the aggregation results are returned
{
  "took": 29,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "skipped" : 0,
    "failed": 0
  },
  "hits" : {
     "total" : {
        "value": 1000,
        "relation": "eq"
     },
    "max_score" : null,
    "hits" : [ ]
  },
  "aggregations" : {
    "group_by_state" : {
      "doc_count_error_upper_bound": 20,
      "sum_other_doc_count": 770,
      "buckets" : [ {
        "key" : "ID",
        "doc_count" : 27
      }, {
        "key" : "TX",
        "doc_count" : 27
      }, {
        "key" : "AL",
        "doc_count" : 25
      }, {
        "key" : "MD",
        "doc_count" : 25
      }, {
        "key" : "TN",
        "doc_count" : 23
      }, {
        "key" : "MA",
        "doc_count" : 21
      }, {
        "key" : "NC",
        "doc_count" : 21
      }, {
        "key" : "ND",
        "doc_count" : 21
      }, {
        "key" : "ME",
        "doc_count" : 20
      }, {
        "key" : "MO",
        "doc_count" : 20
      } ]
    }
  }
}





// this combines the previous aggregation with a average_balance aggregation to 
// calculate the average balance in each account
GET /bank/_search
{
  "size": 0,
  "aggs": {
    "group_by_state": {
      "terms": {
        "field": "state.keyword",
        "order": {
          "average_balance": "desc"
        }
      },
      "aggs": {
        "average_balance": {
          "avg": {
            "field": "balance"
          }
        }
      }
    }
  }
}
// the sorting order of this query is after the result of the nested aggregation


// there are four different types of aggregations
// Bucketing: contains a series of aggregations that create buckets, each bucket is associated with a key and 
// a document criterion. The aggregation returns a list of buckets each containing a set of documents 
// Metric: aggragations that keep track and compute metrics over a set of documents 
// Matrix: a set of aggregations that operate on multiple fields and produce a matrix result based on the values
// extracted from the requested document fields
// Pipeline: aggragations that aggregate the output of other aggregations and their associated matrics

// Aggregations can be nested to create multiple levels of assosiated buckets

// Basic aggregation structure
"aggregations" : {          //optionally aggs
    "<aggregation_name>" : {
        "<aggregation_type>" : {
            <aggregation_body>
        }
        [,"meta" : {  [<meta_data_body>] } ]?
        [,"aggregations" : { [<sub_aggregation>]+ } ]?
    }
    [,"<aggregation_name_2>" : { ... } ]*
}

// each aggregation is associated with a logical name that the user defines. These
// also works as unique identifiers for the aggregation in the response
// the aggregation type is typically the first key within the named aggregation body.
// each type of aggregation defines its own body depending on the nature of the aggregation

