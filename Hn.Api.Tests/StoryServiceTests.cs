using System.Threading;
using System.Threading.Tasks;
using Hn.Api.Models;
using Hn.Api.Services;
using Moq;
using Xunit;
using System.Linq;

public class StoryServiceTests
{
    [Fact]
    public async Task Returns_Paged_And_Filters_By_Query()
    {
        var mock = new Mock<IHnClient>();

        mock.Setup(m => m.GetNewestIdsAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(Enumerable.Range(1, 5).ToList());

        mock.Setup(m => m.GetItemAsync(It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((int id, CancellationToken _) => new HnItem
            {
                Id = id,
                Type = "story",
                Title = id % 2 == 0 ? "Angular rocks" : "Other topic",
                Url = id % 2 == 0 ? "https://example.com" : null
            });

        var svc = new StoryService(mock.Object);

        var result = await svc.GetNewestAsync("angular", page: 1, pageSize: 2, CancellationToken.None);

        Assert.Equal(1, result.Page);
        Assert.Equal(2, result.PageSize);
        Assert.True(result.Total >= result.Items.Count());
        Assert.All(result.Items, s => Assert.Contains("angular", s.Title, System.StringComparison.OrdinalIgnoreCase));
        // Ensure URL fallback for null Url
        Assert.All(result.Items, s => Assert.False(string.IsNullOrWhiteSpace(s.Link)));
    }
}
