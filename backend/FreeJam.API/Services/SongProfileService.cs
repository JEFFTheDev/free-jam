using Microsoft.EntityFrameworkCore;
using FreeJam.API.DTOs;
using FreeJam.API.Exceptions;
using FreeJam.API.Interfaces;
using FreeJam.API.Models;

namespace FreeJam.API.Services
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

        public async Task<ChordChangeDto> UpsertChordChangeToSongProfile(PutChordChangeDto chordChange)
        {
            var songProfile = await this.GetSongProfile(chordChange.SongTitle, chordChange.SongArtist);
            ChordChange upsertedChordChange;
            if (chordChange.Id != null)
            {
                var existing = await this._chordRepository.ChordChanges.SingleOrDefaultAsync(x => x.Id == chordChange.Id);
                if (existing == null)
                {
                    throw new NotFoundException($"Chord change with id '{chordChange.Id}' not found");
                }

                existing.Chord = this._chordRepository.Chords.Single(x => x.Shape == chordChange.Chord.Shape);
                existing.AtMilliseconds = chordChange.AtMilliseconds;
                existing.Duration = chordChange.Duration;
                upsertedChordChange = existing;
            }
            else
            {
                var newChordChange = new ChordChange
                {
                    AtMilliseconds = chordChange.AtMilliseconds,
                    Duration = chordChange.Duration,
                    Chord = this._chordRepository.Chords.Single(x => x.Shape == chordChange.Chord.Shape),
                };
                songProfile.Changes.Add(newChordChange);
                upsertedChordChange = newChordChange;
            }

            await this._songProfileRepository.SaveChangesAsync();
            await this._chordRepository.SaveChangesAsync();
            return new ChordChangeDto
            {
                Id = upsertedChordChange.Id,
                Duration = upsertedChordChange.Duration,
                AtMilliseconds = upsertedChordChange.AtMilliseconds,
            };
        }

        public async Task Update(SongProfileDto songProfileDto)
        {
            var shapes = songProfileDto.Chords.Select(x => x.Shape).ToList();
            var chords = await this._chordRepository.Chords.Where(x => shapes.Contains(x.Shape)).ToListAsync();
            var songProfileToUpdate = await this.GetSongProfile(songProfileDto.Song.Title, songProfileDto.Song.Artist);
            songProfileToUpdate.Changes = songProfileDto.Changes.Select((x) => new ChordChange
            {
                AtMilliseconds = x.AtMilliseconds,
                Duration = x.Duration,
                Chord = chords.Single(y => y.Shape == songProfileDto.Chords.ElementAt(x.ChordIndex).Shape),
            }).ToList();
            songProfileToUpdate.Tuning = songProfileToUpdate.Tuning;
            await this._chordRepository.SaveChangesAsync();
            await this._songProfileRepository.SaveChangesAsync();
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
            var songProfile = await this.GetSongProfile(title, artist);
            var chords = songProfile.Changes.DistinctBy(x => x.Chord).Select(x => x.Chord).ToList();
            return new SongProfileDto
            {
                Tuning = songProfile.Tuning,
                Song = new SongDto
                {
                    Title = songProfile.Song.Title,
                    VideoId = songProfile.Song.VideoId,
                    Artist = songProfile.Song.Artist,
                },
                Chords = chords.Select(x => new ChordDto
                {
                    Instrument = x.Instrument,
                    Name = x.Name,
                    Shape = x.Shape,
                    Variant = x.Variant,
                }).ToList(),
                Changes = songProfile.Changes.Select(x => new ChordChangeDto
                {
                    Id = x.Id,
                    AtMilliseconds = x.AtMilliseconds,
                    ChordIndex = chords.Where(y => y.Shape == x.Chord.Shape).Select(x => chords.IndexOf(x)).First(),
                    Duration = x.Duration,
                }).ToList()
            };
        }

        private async Task<SongProfile> GetSongProfile(string title, string artist)
        {
            var songProfile = await _songProfileRepository.SongProfiles
                .Include(x => x.Song)
                .Where(x => x.Song.Artist == artist && x.Song.Title == title)
                .Include(x => x.Changes)
                .ThenInclude(x => x.Chord)
                .FirstOrDefaultAsync();

            if (songProfile == null)
            {
                throw new NotFoundException($"songProfile with title '{title}' and '{artist}' could not be found");
            }

            return songProfile;
        }
    }
}