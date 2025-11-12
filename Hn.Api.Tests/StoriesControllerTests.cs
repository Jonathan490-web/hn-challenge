using System.Net;
using System.Threading.Tasks;
using Hn.Api;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

public class StoriesControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public StoriesControllerTests(WebApplicationFactory<Program> factory) => _factory = factory;

    [Fact]
    public async Task Swagger_Loads_And_Api_Responds()
    {
        var client = _factory.CreateClient();
        var resp = await client.GetAsync("/swagger/index.html");
        Assert.Equal(HttpStatusCode.OK, resp.StatusCode);

        var api = await client.GetAsync("/api/stories?page=1&pageSize=5");
        Assert.Equal(HttpStatusCode.OK, api.StatusCode);
    }
}
