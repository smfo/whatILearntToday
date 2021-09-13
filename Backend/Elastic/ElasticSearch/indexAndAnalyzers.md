# How to make indexes, analysers, tokens and filters
Elasticsearch schema

#### Analyzer:
Specifies the analyzer used for teqt analysis when indexing or searching a text field
can be overwritten with search_analyziz, otherwise this is used for indexing and searching

#### Tokenizer:
Recives a stream of characters and breaks it into individual tokens. The result is output as a stream.
The tokenizer chosen decides how the characters are split up

Some built in tokenizers:\
Standard: devides on word boundaries\
Whitespace: devides on whitespace\
Letter: devides text every time a character which isnt a letter is encountered\
Lowercase: same as letter + lowercases all terms

#### Filter:
Combine the filters used in the given index

#### Mapping:
Maps fields in the data to search and index analyzers. One field can be connected to multiple analyzers

```C#
"settings": {
    "max_result_window": "500000",

    "analysis": {
        "analyzer": {
            "play_with_phonetic": { // analyzer
                "tokenizer": "standard",
                "filter": [
                    "lowercase",
                    "my_phonetic"
                ]
            },
            "custom_whitespace": {
                "type": "custom",
                "tokenizer": "whitespace",
                "filter": [
                    "lowercase",
                    "word_delimiter_filter"
                ]
            }
        },

        "tokenizer": {
            "complaint_number_tokenizer": {
                "token_chars": [
                    "letter",
                    "digit",
                    "punctuation",
                    "whitespace"
                ],
                "min_gram": "2",
                "type": "edge_ngram",
                "max_gram": "50"
            },
            "caseNumber_TM_tokenizer": {
                "token_chars": [
                    "letter",
                    "digit",
                    "punctuation"
                ],
            }
        },

        "filter": {
            "my_phonetic": {
                "encoder": "metaphone",
                "replace": false,
                "type": "phonetic"
            },
            "nGram_filter": {
                "type": "nGram",
                "min_gram": 1,
                "max_gram": 50
            },
            "one_token_limit": {
                "type": "limit",
                "max_token_count": 1
            },
            "custom_length_filter": {
                "type": "length",
                "min": 2
            }
        }
    },
    "mapping": {
        "trademarkmodel": {
            "properties": {
                "trademarkText": {  //field in database
                    "type": "text",
                    "analyzer": "custom_ngram",
                    "search_analyzer": "custom_search_analyzer",
                    "fields": {
                        "keyword": {
                            "ignore_above": 256,
                            "type": "keyword",
                            "normalizer": "lowercase_normalizer"
                        },
                        "phrase": {
                            "type": "text",
                            "analyzer": "custom_whitespace",
                            "search_analyzer": "custom_whitespace"
                        },
                        "firstToken": {
                            "type": "text",
                            "analyzer": "first_token",
                            "search_analyzer": "standard"
                        },
                        "phonetic": { //creating a connection between trademarkText and play_with_phonetic
                            "type": "text",
                            "analyzer": "play_with_phonetic",
                            "search_analyzer": "play_with_phonetic"
                        }
                    }
                },
            }
        }
```

When adding data to the index the analyzers are added to a set index, in this example they are all added to the same index "mark2"
the data can be added individually or all data in a database can be run through the schema when running the api.


Search the chosen field with a given analyzer from search api

```C#
var queries = new List<Func<QueryContainerDescriptor<TrademarkModel>, QueryContainer>>();

queries.AddWhen(usePhonetic, must => must.Match(m => CreateMatchPhoneticQuery(m, query.MarkTextSearch)))

private static IMatchQuery CreateMatchPhoneticQuery(
            MatchQueryDescriptor<TrademarkModel> match, TrademarkTextSearchQuery query)
        {
            // For field TrademarkText in TrademarkModel, use the suffix "phonetic" and the query query.textInput
            return match.Field(f => f.TrademarkText.Suffix("phonetic")).Query(query.TextInput);
        }
```