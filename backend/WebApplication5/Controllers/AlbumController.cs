using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication5.Interfaces;
using WebApplication5.Models;
using WebApplication5.Services;

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
        public async Task<IEnumerable<DTOs.AlbumDto>> Get()
        {
            return await _albumService.GetAll();
        }

        [HttpPost]
        public async Task<ActionResult<DTOs.AlbumDto>> Post(DTOs.AlbumDto album)
        {
            if (string.IsNullOrWhiteSpace(album.Artist))
            {
                return BadRequest("Artist cannot be empty");
            }

            if (string.IsNullOrWhiteSpace(album.Title))
            {
                return BadRequest("Title cannot be empty");
            }

            if (album.Songs.Length == 0)
            {
                return BadRequest("Songs must be included");
            }

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
