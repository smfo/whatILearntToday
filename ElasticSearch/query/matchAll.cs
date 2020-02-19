

// The simplest query which matches all documents giving them a score of 1.0
GET /_search
{
    "query": {
        "match_all": { "boost" : 1.2 }
    }
}
// the score can also be changed with a boost parameter


// match non query is the opposit of match all and matches no documents
GET /_search
{
    "query": {
        "match_none": {}
    }
}