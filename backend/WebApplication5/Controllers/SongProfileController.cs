﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WebApplication5.DTOs;
using WebApplication5.Interfaces;
using WebApplication5.Models;

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
        public async Task<ActionResult<SongProfileDto>> Get(string title, string artist) {
            return await this._songProfileService.Get(title, artist);
        }

        [HttpPost]
        public async Task<ActionResult<SongProfileDto>> Post(SongProfileDto songProfile)
        {
            _logger.LogInformation($"Attempting to add: {songProfile}");

            // if (!_songService.Exists()) {

            // }

            if (songProfile.Song == null)
            {
                return BadRequest("Song must be included");
            }

            if (songProfile.Changes == null)
            {
                return BadRequest("Changes must be included");
            }

            if (songProfile.Chords == null)
            {
                return BadRequest("Chords must be included");
            }

            if (songProfile.Changes!.MaxBy(x => x.ChordIndex)?.ChordIndex + 1 != songProfile.Chords.Count())
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
