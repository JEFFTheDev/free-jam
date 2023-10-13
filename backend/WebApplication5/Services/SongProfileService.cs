using Microsoft.EntityFrameworkCore;
using WebApplication5.DTOs;
using WebApplication5.Interfaces;
using WebApplication5.Models;

namespace WebApplication5.Services
{
    public class SongProfileService : ISongProfileService
    {
        private readonly ISongProfileRepository _songProfileRepository;
        private readonly ISongRepository _songRepository;
        private readonly IChordRepository _chordRepository;

        public SongProfileService(ISongProfileRepository songProfileRepository, ISongRepository songRepository, IChordRepository chordRepository)
        {
            this._songProfileRepository = songProfileRepository;
            this._songRepository = songRepository;
            this._chordRepository = chordRepository;
        }

        public async Task Add(SongProfileDto songProfile)
        {
            // Check which chords are already present in the database
            var chordsInSong = this._chordRepository.Chords.Where(
                chord => songProfile.Chords.Contains(new ChordDto{
                    Name = chord.Name,
                    Shape = chord.Shape,
                })).ToArray();
            return;
            // Evaluate missing chords and add them if necesary
            // var missing = songProfile.Chords.Where(
            //         chord => !chordsInSong.Any(chordInSong => chord.Name == chordInSong.Name && chord.Shape == chordInSong.Shape)
            //     ).Select(x => new Chord
            //     {
            //         Name = x.Name,
            //         Shape = x.Shape,
            //         Instrument = Enums.Instrument.Guitar,
            //     }).ToArray();

            var missing = chordsInSong;

            if (missing.Length > 0)
            {
                this._chordRepository.Chords.AddRange(missing);
            }

            this._songProfileRepository.SongProfiles.Add(new SongProfile
            {
                // Find the song that belongs to this songprofile
                Song = this._songRepository.Songs.First(x => x.Title == songProfile.Song.Title && x.VideoId == songProfile.Song.VideoId),

                // All changes are new entries in the db, so map them from the dto
                Changes = songProfile.Changes.Select(x => new ChordChange
                {
                    AtMilliseconds = x.AtMilliseconds,
                    Duration = x.Duration,
                    Chord = chordsInSong.FirstOrDefault(
                        (y) => {
                            var songProfileChord = songProfile.Chords.ElementAt(x.ChordIndex);
                            return songProfileChord.Name == y.Name && songProfileChord.Shape == y.Shape;
                        }) ?? missing.First(
                        (y) => {
                            var songProfileChord = songProfile.Chords.ElementAt(x.ChordIndex);
                            return songProfileChord.Name == y.Name && songProfileChord.Shape == y.Shape;
                        })
                }).ToList(),
                Tuning = songProfile.Tuning,
            });
            await this._songProfileRepository.SaveChangesAsync();
        }

        public async Task<ICollection<SongProfileDto>> Get(string title, string artist)
        {
                var songProfile = await _songProfileRepository.SongProfiles
                .Include(x => x.Song)
                .Where(x => x.Song.Artist == artist && x.Song.Title == title)
                .Include(x => x.Changes)
                .ThenInclude(x => x.Chord)
                .FirstOrDefaultAsync();
                return null;
        }
    }
}