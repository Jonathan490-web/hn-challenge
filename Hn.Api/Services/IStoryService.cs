using Hn.Api.Models;

namespace Hn.Api.Services;

public interface IStoryService
{
    Task<PagedResult<StoryDto>> GetNewestAsync(string? query, int page, int pageSize, CancellationToken ct);
}
