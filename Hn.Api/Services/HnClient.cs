using System.Net.Http.Json;
using Hn.Api.Models;
using Microsoft.Extensions.Caching.Memory;

namespace Hn.Api.Services;

public class HnClient : IHnClient
{
    private readonly HttpClient _http;
    private readonly IMemoryCache _cache;

    private const string NewStoriesKey = "hn:newstories";
    private static readonly TimeSpan IdsCacheTtl = TimeSpan.FromMinutes(2);
    private static readonly TimeSpan ItemCacheTtl = TimeSpan.FromMinutes(10);

    public HnClient(HttpClient http, IMemoryCache cache)
    {
        _http = http;
        _cache = cache;
    }

    public async Task<IReadOnlyList<int>> GetNewestIdsAsync(CancellationToken ct)
    {
        if (_cache.TryGetValue(NewStoriesKey, out IReadOnlyList<int>? cached) && cached is not null)
            return cached;

        var ids = await _http.GetFromJsonAsync<int[]>("v0/newstories.json", ct) 
                  ?? Array.Empty<int>();
        _cache.Set(NewStoriesKey, ids, IdsCacheTtl);
        return ids;
    }

    public async Task<HnItem?> GetItemAsync(int id, CancellationToken ct)
    {
        var key = $"hn:item:{id}";
        if (_cache.TryGetValue(key, out HnItem? cached) && cached is not null)
            return cached;

        var item = await _http.GetFromJsonAsync<HnItem>($"v0/item/{id}.json", ct);
        if (item is not null)
            _cache.Set(key, item, ItemCacheTtl);

        return item;
    }
}
