

// These queries wrap other compound or leaf queries, either to combine their results and scores,
// to change their behaviour of to switch from query to filter context

// Bool queries
// Contains the default query clauses for combining multiple leaf and compound clauses, must, should,
// must_not and filter. The two later are excecuted in filter context, while the two former hage their
// scores combined, the more matching clauses the better

// Boosting query
// return documents which match a positive query, but reduce the score of documents which also match a 
// nagative query

// Constant_score query
// A query which wraps another query, but executes it in filter context. All matching documents are given
// the same "constant" _score

// Dis_max query
// A quiery which accepts multiple queries, and returns documents who match any of these clauses.
// While the bool query combines the scores from all matching queries, dis_max uses the score of 
// the single best-matching query clause

// Function_score
// use functions to modify the scores returned by the main query, to take into account factores like
// popularity, recency, distance...




// Boolean queries
// must: the clause must appear in the documents, this will be measured by a score
// should: the clause should appear in the documents, this contributes to the score
// filter: the clause must appear in the documents, otherwise the documents will be filtered out
// must_not: the clause must not appear in the documents, otherwise they will be filtered out

// The query operates after a more-matches-is-better approach, therefore the score from each matching 
// must or should will be added together to provide the final _score





// Boosting query
// returns documents that match a positive query, and reduces the score of docuemnts that doesnt.
// Boosting can be used to demote documents without excluding them from the search results

GET /_search
{
    "query": {
        "boosting" : {
            "positive" : {
                "term" : {
                    "text" : "apple"
                }
            },
            "negative" : {
                 "term" : {
                     "text" : "pie tart fruit crumble tree"
                }
            },
            "negative_boost" : 0.5
        }
    }
}

// positive: (required query object) any returned document must match this query
// negative: used to decrease the relevance score of matching documents
// negative_boost: float between 0 and 1.0, used to decreade the relevance score of
// documents matching the negative query




// Constant score query
// Wraps a filter query and returns every document with a relevant score equal to boost

GET /_search
{
    "query": {
        "constant_score" : {
            "filter" : {
                "term" : { "user" : "kimchy"}
            },
            "boost" : 1.2
        }
    }
}

// filter: the filter query to run, returned documents must match this query, no score calculated
// boost: gives the constant relevance score for every document matching the filter. default 1.0



// Disjunction max query
// returns documents matching one or more wrapped queries

GET /_search
{
    "query": {
        "dis_max" : {
            "queries" : [
                { "term" : { "title" : "Quick pets" }},
                { "term" : { "body" : "Quick pets" }}
            ],
            "tie_breaker" : 0.7
        }
    }
}

// queries: array of query objects, returned documents must match one or more of these
// if a document matches multiple queries, the highest relecanve score is used
// tie_break: float between 0 and 1.0 and is used to increace the score of documents mathing multiple
// query clauses. 
// Take the relevance score from a matching clause with the highest score.
// Multiply the score from any other matching clauses by the tie_breaker value.
// Add the highest score to the multiplied scores.




// Function score
// allow for modification of scores of documents after they are retrived from the main query