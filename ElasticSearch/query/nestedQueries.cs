
// A nested query wraps another query to search on nested fields
// This is neccesary because elasticsearch by default flattens all queries
// If an object matches the searchm the root parent document is returned

// To use a nested query, a nested field mapping must be included
GET /my_index/_search
{
    "query": {
        "nested" : {
            "path" : "obj1",
            "query" : {
                "bool" : {
                    "must" : [
                    { "match" : {"obj1.name" : "blue"} },
                    { "range" : {"obj1.count" : {"gt" : 5}} }
                    ]
                }
            },
            "score_mode" : "avg"
        }
    }
}

// Path: path to the nested object
// Query: query to run on the nested object. search in fields by using the dot notation that
// includes the complete path. Here obj1.____
// score_mode: indicates how scores for matching children objects affect the parents score
// ignore_unmapped: inducates weather unmapped paths should be ignored and not return async documents
// instead of returning an error. Default to false
// if false, an error is returned if the path is async unmapped field
// setting true lets you use the parameter to query multiple indices that may not include the field path

GET /drivers/_search
{
    "query" : {
        "nested" : {
            "path" : "driver",
            "query" : {
                "nested" : {
                    "path" :  "driver.vehicle",
                    "query" :  {
                        "bool" : {
                            "must" : [
                                { "match" : { "driver.vehicle.make" : "Powell Motors" } },
                                { "match" : { "driver.vehicle.model" : "Canyonero" } }
                            ]
                        }
                    }
                }
            }
        }
    }
}