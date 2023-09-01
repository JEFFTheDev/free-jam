using Microsoft.AspNetCore.Mvc;
using WebApplication5.Entities;

namespace WebApplication5.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SongController : ControllerBase
    {
        private readonly ILogger<SongController> _logger;
        private readonly ApplicationDbContext _dbContext;

        public SongController(ILogger<SongController> logger, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<Song> Get()
        {
            return _dbContext.Songs.ToArray();
        }

        [HttpPost]
        public async Task<ActionResult<Song>> Post(Song song)
        {
            if (string.IsNullOrWhiteSpace(song.Artist))
            {
                return new BadRequestResult();
            }

            if (string.IsNullOrWhiteSpace(song.Title))
            {
                return new BadRequestResult();
            }

            if (_dbContext.Songs.Any(x => x.Artist == song.Artist && x.Title == song.Title))
            {
                return new BadRequestResult();
            }

            _logger.LogInformation($"Attempting to add: {song}");
            _dbContext.Songs.Add(song);
            await _dbContext.SaveChangesAsync();
            _logger.LogInformation($"Created Song: {song}");
            return CreatedAtAction(nameof(Post), song);
        }
    }
}
