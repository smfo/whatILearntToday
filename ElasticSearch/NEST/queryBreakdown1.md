
# NEST query breakdown 1

```C#
var response = client.Search<IpCaseModel>(search =>
            {
                return search.AllTypes()
                    .Source(sf => sf.Includes(i => i.Fields(f => f.BiblioData.Domain, f => f.BiblioData.Idapplication,
                        f => f.BiblioData.Idregistration, f => f.BiblioData.OPI, f => f.Status.HighLevelStatus,
                        f => f.PicturePath, f => f.BiblioData.Title, f => f.BiblioData.CustomerReference,
                        f => f.BiblioData.Types.NatureMarkCode, f => f.Invoices, f => f.Renewal,
                        f => f.OutgoingCorrespondences)))
                    .From(query.From)
                    .Sort(ss => ss.Field(f => f.Field(query.SortField).Order(query.SortOrder)))
                    .Take(query.Take ?? 20)
                    .Aggregations(x => SetUpAggregation(x, query.Aggregation, query))
                    .Query(q => q.Bool(bq => bq.Must(queries)))
                    .Highlight(highlight =>
                        highlight.Fields(f => f
                            .Field("*").PreTags("<em>").PostTags("</em>")))
                    .SetPostFilters(BuildFilters(query));
            });
```

Source: which fields from the source should be returned for each object. Contains excludes and includes. 
In this case we are using a IpCaseModel object, and the possible fields are selected from there.
From: dictates which hit to start pulling from. Used for pagination
Sort: sorts by the provided file in the provided order.
Take: how many results to return
Aggregations: Count the results and group them according to a field value
Query: What values should the chosen fields contain. If they do not have these they are given a less relevant score
Highlight: highlighted hits should be provided in the selected fields with the provided pre and post tags

SetPostFilters: 
example: searching for boats on Finn.no located in Oslo.
The webpage sould need to know how many hits are in all the counties, however these results should not be
displayed when the user have chosen Oslo. Therefore the aggregation needs to be done before the filtering of the hits.
Filters built in SetPostFilters are applied after the aggregation is finished