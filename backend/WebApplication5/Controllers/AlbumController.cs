using Microsoft.AspNetCore.Mvc;
using WebApplication5.Entities;

namespace WebApplication5.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlbumController : ControllerBase
    {
        private readonly ILogger<AlbumController> _logger;
        private readonly ApplicationDbContext _dbContext;

        public AlbumController(ILogger<AlbumController> logger, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<Album> Get()
        {
            return _dbContext.Albums.ToArray();
        }

        [HttpPost]
        public async Task<ActionResult<Album>> Post(Album Album)
        {
            if (string.IsNullOrWhiteSpace(Album.Artist))
            {
                return new BadRequestResult();
            }
            
            if (string.IsNullOrWhiteSpace(Album.Title))
            {
                return new BadRequestResult();
            }

            if (_dbContext.Albums.Any(x => x.Artist == Album.Artist && x.Title == Album.Title))
            {
                return new BadRequestResult();
            }

            _logger.LogInformation($"Attempting to add: {Album}");
            _dbContext.Albums.Add(Album);
            await _dbContext.SaveChangesAsync();
            _logger.LogInformation($"Created Album: {Album}");
            return CreatedAtAction(nameof(Post), Album);
        }
    }
}
