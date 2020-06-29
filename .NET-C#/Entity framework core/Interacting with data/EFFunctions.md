
# EF Functions

Provides CLD methods that translates to database functions when used in a LINQ Entity query.\
The queries will not work outside of this setting and will result in a NotSupportedException.

### Like
Used in WHERE clauses to search for specified patterns in a column.\
`EF.Functions.Like(field name, query that may contain wildcards)`

The two most common wildcards are:
* %: represents zero, one or multiple characters (same as * in MS Access)
* _: represents a single character

```C#
// Find all cities that starts with a vowel
var customers = from c in context.Customers 
                   where EF.Functions.Like(c.City, "[aeiou]%")
                   select c;
```

```C#
 public SearchResult<ApprovedTermListItem> Search(SearchTermQuery query)
        {
            using (var data = _dataProvider.Read())
            {
                var allRows = data.ApprovedTerms
                    .Where(x => !string.IsNullOrEmpty(x.EnglishDescription))
                    .Where(x => string.IsNullOrEmpty(query.SearchString) ||
                        EF.Functions.Like(x.NorwegianDescription, $"%{query.SearchString}%") ||
                        EF.Functions.Like(x.HDBExternalReference, $"{query.SearchString}%") ||
                        EF.Functions.Like(x.NiceReference, $"0{query.SearchString}%")
                        )
                    .Where(x => string.IsNullOrEmpty(query.Source) || x.TermSources.Any(t => t.Source == query.Source))
                    .Where(x => string.IsNullOrEmpty(query.NiceClass) || x.NiceClassId == query.NiceClass);

                return new SearchResult<ApprovedTermListItem>
                {
                    TotalHits = allRows.Count(),
                    Items = allRows.OrderByDescending(x => x.ModifiedAtUtc).Skip(query.From).Take(query.Take).Include(x => x.TermSources).Select(ToApprovedTermListItem)
                };
            }
        }
```