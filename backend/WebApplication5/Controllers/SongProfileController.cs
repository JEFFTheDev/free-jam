using Microsoft.AspNetCore.Mvc;
using WebApplication5.DTOs;
using WebApplication5.Exceptions;
using WebApplication5.Interfaces;

namespace WebApplication5.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SongProfileController : ControllerBase
    {
        private readonly ILogger<SongProfileController> _logger;
        private readonly ISongProfileService _songProfileService;
        private readonly IChordService _chordService;

        public SongProfileController(ILogger<SongProfileController> logger, ISongProfileService songProfileService, IChordService chordService)
        {
            this._logger = logger;
            this._songProfileService = songProfileService;
            this._chordService = chordService;
        }

        [HttpGet]
        public async Task<ActionResult<SongProfileDto>> Get(string title, string artist)
        {
            try
            {
                var profile = await this._songProfileService.Get(title, artist);
                return profile;
            }
            catch (NotFoundException)
            {
                return NotFound($"song profile with title '{title}' and artist '{artist}' not found");
            }
        }

        [HttpPut]
        public async Task<ActionResult<ChordChangeDto>> PutChordChange(PutChordChangeDto chordChange)
        {
            if (!await this._chordService.ChordExists(chordChange.Chord.Shape))
            {
                return BadRequest($"Chord with shape {chordChange.Chord.Shape} not found");
            }

            try
            {
                return await this._songProfileService.UpsertChordChangeToSongProfile(chordChange);
            }
            catch (NotFoundException)
            {
                return NotFound($"song profile with title '{chordChange.SongTitle}' and artist '{chordChange.SongArtist}' was not found");
            }
        }

        [HttpPatch]
        public async Task<ActionResult<SongProfileDto>> Patch(SongProfileDto songProfile)
        {
            _logger.LogInformation($"Attempting to patch: {songProfile}");

            // if (!_songService.Exists()) {

            // }

            if (songProfile.Changes!.MaxBy(x => x.ChordIndex)?.ChordIndex + 1 != songProfile.Chords.Count())
            {
                return BadRequest("Chord change chord indexes do not match chords");
            }

            var allExist = await _chordService.ChordsExists(songProfile.Chords.Select(x => x.Shape).ToArray()!);
            if (!allExist.Item1)
            {
                return BadRequest($"Some chords do not exist yet: {allExist.Item2.Aggregate((current, next) => current + ", " + next)}");
            }

            await this._songProfileService.Update(songProfile);

            _logger.LogInformation($"Updated Song Profile: {songProfile}");
            return Accepted(nameof(Patch), songProfile);
        }

        [HttpPost]
        public async Task<ActionResult<SongProfileDto>> Post(SongProfileDto songProfile)
        {
            _logger.LogInformation($"Attempting to add: {songProfile}");

            // if (!_songService.Exists()) {

            // }

            if (songProfile.Changes.MaxBy(x => x.ChordIndex)?.ChordIndex + 1 != songProfile.Chords.Count())
            {
                return BadRequest("Chord change chord indexes do not match chords");
            }

            var allExist = await _chordService.ChordsExists(songProfile.Chords.Select(x => x.Shape).ToArray()!);
            if (!allExist.Item1)
            {
                return BadRequest($"Some chords do not exist yet: {allExist.Item2.Aggregate((current, next) => current + ", " + next)}");
            }

            await this._songProfileService.Add(songProfile);

            _logger.LogInformation($"Created Song Profile: {songProfile}");
            return CreatedAtAction(nameof(Post), songProfile);
        }
    }
}
