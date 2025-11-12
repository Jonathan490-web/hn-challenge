using Hn.Api.Models;

namespace Hn.Api.Services;

public class StoryService : IStoryService
{
    private readonly IHnClient _client;

    public StoryService(IHnClient client) => _client = client;

    public async Task<PagedResult<StoryDto>> GetNewestAsync(string? query, int page, int pageSize, CancellationToken ct)
    {
        page = page <= 0 ? 1 : page;
        pageSize = Math.Clamp(pageSize, 1, 100);

        var ids = await _client.GetNewestIdsAsync(ct);

        // Pull a window big enough to page after filtering
        var window = Math.Min(ids.Count, page * pageSize * 2);

        var items = await Task.WhenAll(
            ids.Take(window).Select(id => _client.GetItemAsync(id, ct))
        );

        var stories = items
            .Where(i => i is not null && i.Type == "story")
            .Select(i => i!)
            .Select(i => new StoryDto
            {
                Id = i.Id,
                Title = i.Title ?? "(no title)",
                Link = string.IsNullOrWhiteSpace(i.Url)
                    ? $"https://news.ycombinator.com/item?id={i.Id}"
                    : i.Url!
            });

        if (!string.IsNullOrWhiteSpace(query))
        {
            var q = query.Trim();
            stories = stories.Where(s => s.Title.Contains(q, StringComparison.OrdinalIgnoreCase));
        }

        var list = stories.ToList();
        var total = list.Count;

        var pageItems = list
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return new PagedResult<StoryDto>
        {
            Items = pageItems,
            Total = total,
            Page = page,
            PageSize = pageSize
        };
    }
}
