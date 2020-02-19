
// These queries enable search on analyzed text fields. the query string is processed
// using the same analyzer that was applied to the field during indexing

// Interval query
// full text query that allows control of ordering and proximity of mathing terms

// Match query
// standard search, includes fuzzy, phrase and proximity queries

// Match_bool_prefix query
// creates a bool query that matches each term (in the query or string) as a term query,
// except for the last term, which is matched as a prefix query

// Match_phrase query
// like match, but used for matching excact phrases or word proximity matches

// Match_phrase_prefix
// like match_phrase, but does a wildcard search on the final word

// Multi_match
// like match but allow for searching multiple fields

// Common terms query
// Gives more preference to uncommon words

// Query_string
// Allows for specifying AND|OR|NOT conditions and multi-field search withing a single query string

// Simple_query_string
// a simpler version of query_string suitable for exposing directly to the users