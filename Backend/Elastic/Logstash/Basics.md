# Basics

The central dataflow engine in the Elastic Stach for gathering, enrighing and unifying data. Regardles of format and schema.

* Open-source
* Quick setup
* Horizontally scalable

A stack takes input, filters the data and create an output.

## Filter

Match: the message field is made to match a pattern defined by us?
```JSON
Match => [
    // Where greedy data is the rest of the data, that is not a date
    "message", "%TIMESTAMP_ISO8601:timestamp_string}%{SPACE}%{GREEDYDATA:line}"
]
```

Date: the timestamp string is parsed to a real date object
```JSON
date {
    match => ["timestamp_string", "ISO8601"]
}
```

Mutate: remove fields we do not want, in order to save space 

```JSON
mutate {
    remove_fields => [message, timestamp_string]
}
```