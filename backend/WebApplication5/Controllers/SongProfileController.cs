using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WebApplication5.Models;

namespace WebApplication5.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SongProfileController : ControllerBase
    {
        // private readonly ILogger<SongProfileController> _logger;
        // private readonly ApplicationDbContext _dbContext;

        // public SongProfileController(ILogger<SongProfileController> logger, ApplicationDbContext dbContext)
        // {
        //     _logger = logger;
        //     _dbContext = dbContext;
        // }

        // [HttpGet]
        // public async Task<ActionResult<SongProfile>> Get(string artist, string title)
        // {
        //     if (string.IsNullOrWhiteSpace(artist))
        //     {
        //         return new BadRequestResult();
        //     }

        //     if (string.IsNullOrWhiteSpace(title))
        //     {
        //         return new BadRequestResult();
        //     }

        //     var songProfile = await _dbContext.SongProfiles
        //         .Include(x => x.Song)
        //         .Where(x => x.Song.Artist == artist && x.Song.Title == title)
        //         .Include(x => x.Changes)
        //         .ThenInclude(x => x.Chord)
        //         .FirstOrDefaultAsync();
        //     if (songProfile == null)
        //     {
        //         return new NotFoundResult();
        //     }

        //     return songProfile;
        // }
        // [HttpPost]
        // public async Task<ActionResult<SongProfile>> Post(SongProfile songProfile)
        // {
        //     _logger.LogInformation($"Attempting to add: {songProfile}");
        //     _dbContext.SongProfiles.Add(songProfile);
        //     await _dbContext.SaveChangesAsync();
        //     _logger.LogInformation($"Created Song: {songProfile}");
        //     return CreatedAtAction(nameof(Post), songProfile);
        // }
    }
}
