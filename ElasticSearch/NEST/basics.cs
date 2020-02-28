
// NEST is a high level Elasticsearch .NET client

Install-package NEST

var client = new ElasticClient();

// or, if adding configuration options
var settings = new ConnectionSettings(new Uri("http://example.com:9200"))
    .DefaultIndex("people");

var client = new ElasticClient(settings);