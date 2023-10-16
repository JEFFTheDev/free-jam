using Microsoft.EntityFrameworkCore;
using WebApplication5.DTOs;
using WebApplication5.Interfaces;
using WebApplication5.Models;

namespace WebApplication5.Services
{
    public class SongProfileService : ISongProfileService
    {
        private readonly ILogger<SongProfileService> _logger;
        private readonly ISongProfileRepository _songProfileRepository;
        private readonly ISongRepository _songRepository;
        private readonly IChordRepository _chordRepository;

        //  TODO:performance of this service could be better
        public SongProfileService(
            ISongProfileRepository songProfileRepository,
            ISongRepository songRepository,
            IChordRepository chordRepository,
            ILogger<SongProfileService> logger)
        {
            this._songProfileRepository = songProfileRepository;
            this._songRepository = songRepository;
            this._chordRepository = chordRepository;
            this._logger = logger;
        }

        public async Task Add(SongProfileDto songProfile)
        {
            var shapes = songProfile.Chords.Select(x => x.Shape).ToList();
            var chords = await this._chordRepository.Chords.Where(x => shapes.Contains(x.Shape)).ToListAsync();

            this._songProfileRepository.SongProfiles.Add(new SongProfile
            {
                // Find the song that belongs to this songprofile
                Song = this._songRepository.Songs.First(x => x.Title == songProfile.Song.Title && x.VideoId == songProfile.Song.VideoId),

                // All changes are new entries in the db, so map them from the dto
                Changes = songProfile.Changes.Select((x) => new ChordChange
                {
                    AtMilliseconds = x.AtMilliseconds,
                    Duration = x.Duration,
                    Chord = chords.Single(y => y.Shape == songProfile.Chords.ElementAt(x.ChordIndex).Shape),
                }).ToList(),
                Tuning = songProfile.Tuning,
            });
            await this._songProfileRepository.SaveChangesAsync();
        }

        public async Task<SongProfileDto> Get(string title, string artist)
        {
                var songProfile = await _songProfileRepository.SongProfiles
                .Include(x => x.Song)
                .Where(x => x.Song.Artist == artist && x.Song.Title == title)
                .Include(x => x.Changes)
                .ThenInclude(x => x.Chord)
                .FirstOrDefaultAsync();

                var chords = songProfile.Changes.DistinctBy(x => x.Chord).Select(x => x.Chord).ToList();
                return new SongProfileDto{
                    Tuning = songProfile.Tuning,
                    Song = new SongDto{
                        Title = songProfile.Song.Title,
                        VideoId = songProfile.Song.VideoId
                    },
                    Chords = chords.Select(x => new ChordDto{
                        Instrument = x.Instrument,
                        Name = x.Name,
                        Shape = x.Shape,
                        Variant = x.Variant,
                    }).ToList(),
                    Changes = songProfile.Changes.Select(x => new ChordChangeDto{
                        AtMilliseconds = x.AtMilliseconds,
                        ChordIndex = chords.Where(y => y.Shape == x.Chord.Shape).Select(x => chords.IndexOf(x)).First(),
                        Duration = x.Duration,
                    }).ToList()
                };
        }
    }
}