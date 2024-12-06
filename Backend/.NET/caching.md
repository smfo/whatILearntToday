# Caching

## IMemoryCache
Built in caching for ASP.NET.

Add `services.AddMemoryCache()` to `ConfigureServices` and access the cache with dependency injection from the constructor.

```C#
private readonly IMemoryCache _memoryCache;

public EventController(
    IMemoryCache memoryCache)
{
    _memoryCache = memoryCache;
}
```

### TryGetValue, GetOrCreate

TryGetValue tries to retrive a cached object with the provided key. If this is available, you can choose to output the cached value. Otherwise you have to define what to do further.

```C#
public void OnGet()
{
    CurrentDateTime = DateTime.Now;

    if (!_memoryCache.TryGetValue(CacheKeys.Entry, out DateTime cacheValue))
    {
        // If value does not exist in cache, it is here set manually
        cacheValue = CurrentDateTime;

        var cacheEntryOptions = new MemoryCacheEntryOptions()
            .SetSlidingExpiration(TimeSpan.FromSeconds(3));

        _memoryCache.Set(CacheKeys.Entry, cacheValue, cacheEntryOptions);
    }

    // Use cached value
    CacheCurrentDateTime = cacheValue;
}
```

GetOrCreate is similar, but always sets a cachvalue with the provided key, if it does not already exist.

```C#
var publicEvents = await _memoryCache.GetOrCreate("PublicEvents", publicEvent =>
{
    publicEvent.SetAbsoluteExpiration(TimeSpan.FromMinutes(5));
    return GetPublicEvents();
});

return publicEvents;
```

### Expiration

How long will the cache persist?\
With SetAbsoluteExpiration the cache will exist for the given time period. It does not matter if the value is retrieved or not.\
With SetSlidingExpiration, the value will persist for the given time then expire, if it is not retrieved. If the value is retreived during the sliding window, the cachetime will reset and start over.

Given this, a sliding expiration time might never expire. To prevent this it is possible to get both a sliding and a absolute expiration time. The one that first runs out will decide when the cache will be renewed.

```C#
var cachedValue = _memoryCache.GetOrCreate(
    CacheKeys.CallbackEntry,
    cacheEntry =>
    {
        cacheEntry.SlidingExpiration = TimeSpan.FromSeconds(3);
        cacheEntry.AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(20);
        return DateTime.Now;
    });
```

## FusionCache

Let's you define a timespan for how long to keep your cache if fetching the new cachevalue fails.

This example caches the data for 6 hours. If fetching new data fails, the old data will be keeps for up tp 7 days, while retrying fetching new data every 5 minutes.

```C#
public class DataService
{
    private readonly IExternalServiceAdapter _externalServiceAdapter;
    private readonly IFusionCache _cache;

    public DataService(IExternalServiceAdapter externalServiceAdapter, IFusionCache cache)
    {
        _externalServiceAdapter = externalServiceAdapter;
        _cache = cache;
    }


    public async Task<IEnumerable<IData>> GetAll()
    {
        var result = await _cache.GetOrSetAsync(
            "my-unique-key",
            _ => _externalServiceAdapter.FetchData(),
            options => options
                .SetDuration(TimeSpan.FromHours(6))
                .SetFailSafe(true, TimeSpan.FromDays(7), TimeSpan.FromMinutes(5))
        );

        return result!;
    }
    
}


```