using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication5.Interfaces;
using WebApplication5.Models;
using WebApplication5.Services;

namespace WebApplication5.Controllers
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
            if (string.IsNullOrWhiteSpace(chord.Name))
            {
                return BadRequest("Name cannot be empty");
            }

            if (string.IsNullOrWhiteSpace(chord.Shape))
            {
                return BadRequest("Shape cannot be empty");
            }

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
