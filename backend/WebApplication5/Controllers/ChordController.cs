using Microsoft.AspNetCore.Mvc;
using WebApplication5.Entities;

namespace WebApplication5.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChordController : ControllerBase
    {
        private readonly ILogger<ChordController> _logger;
        private readonly ApplicationDbContext _dbContext;

        public ChordController(ILogger<ChordController> logger, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<GuitarChord> Get()
        {
            return _dbContext.GuitarChords.ToArray();
        }

        [HttpPost]
        public async Task<ActionResult<GuitarChord>> Post(GuitarChord chord)
        {
            if (string.IsNullOrWhiteSpace(chord.Name))
            {
                return new BadRequestResult();
            }

            if (string.IsNullOrWhiteSpace(chord.Shape))
            {
                return new BadRequestResult();
            }

            if (_dbContext.GuitarChords.Any(x => x.Shape == chord.Shape && x.Name == chord.Name))
            {
                return new BadRequestResult();
            }

            _logger.LogInformation($"Attempting to add: {chord}");
            _dbContext.GuitarChords.Add(chord);
            await _dbContext.SaveChangesAsync();
            _logger.LogInformation($"Created Song: {chord}");
            return CreatedAtAction(nameof(Post), chord);
        }
    }
}
