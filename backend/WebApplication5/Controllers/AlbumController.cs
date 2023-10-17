using Microsoft.AspNetCore.Mvc;
using WebApplication5.DTOs;
using WebApplication5.Interfaces;

namespace WebApplication5.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlbumController : ControllerBase
    {
        private readonly ILogger<AlbumController> _logger;
        private readonly IAlbumService _albumService;

        public AlbumController(ILogger<AlbumController> logger, IAlbumService _albumService)
        {
            this._logger = logger;
            this._albumService = _albumService;
        }

        [HttpGet]
        public async Task<IEnumerable<AlbumDto>> Get()
        {
            return await _albumService.GetAll();
        }

        [HttpPost]
        public async Task<ActionResult<AlbumDto>> Post(AlbumDto album)
        {
            if (await _albumService.AlbumExists(album.Title, album.Artist))
            {
                return BadRequest("Album already exists");
            }

            _logger.LogInformation($"Attempting to add: {album}");
            await this._albumService.Add(album);
            _logger.LogInformation($"Created Album: {album}");
            return CreatedAtAction(nameof(Post), album);
        }
    }
}
