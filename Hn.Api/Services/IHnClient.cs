using Hn.Api.Models;

namespace Hn.Api.Services;

public interface IHnClient
{
    Task<IReadOnlyList<int>> GetNewestIdsAsync(CancellationToken ct);
    Task<HnItem?> GetItemAsync(int id, CancellationToken ct);
}
