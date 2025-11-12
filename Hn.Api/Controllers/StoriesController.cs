using Hn.Api.Models;
using Hn.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hn.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StoriesController : ControllerBase
{
    private readonly IStoryService _service;

    public StoriesController(IStoryService service) => _service = service;

    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<StoryDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> Get([FromQuery] string? q, [FromQuery] int page = 1, [FromQuery] int pageSize = 20, CancellationToken ct = default)
    {
        var result = await _service.GetNewestAsync(q, page, pageSize, ct);
        return Ok(result);
    }
}
