using Microsoft.AspNetCore.Mvc;
using FreeJam.API.Interfaces;

namespace FreeJam.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChordController : ControllerBase
    {
        private readonly ILogger<ChordController> _logger;
        private readonly IChordService _chordService;

        public ChordController(ILogger<ChordController> logger, IChordService chordService)
        {
            this._logger = logger;
            this._chordService = chordService;
        }

        [HttpGet]
        public async Task<IEnumerable<DTOs.ChordDto>> Get(string? filter)
        {
            return await _chordService.GetAll(filter ?? "");
        }

        [HttpPost]
        public async Task<ActionResult<DTOs.ChordDto>> Post(DTOs.ChordDto chord)
        {
            if (chord.Instrument == Enums.Instrument.Unknown)
            {
                return BadRequest("Instrument must be set");
            }

            if (await _chordService.ChordExists(chord.Shape))
            {
                return BadRequest("Chord shape not unique");
            }

            _logger.LogInformation($"Attempting to add: {chord}");
            await this._chordService.Add(chord);
            _logger.LogInformation($"Created Chord: {chord}");
            return CreatedAtAction(nameof(Post), chord);
        }
    }
}
