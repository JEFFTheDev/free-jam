using FreeJam.API.DTOs;
using FreeJam.API.Models;

namespace FreeJam.API.Interfaces
{
    public interface ISongProfileService {
        Task Add(SongProfileDto songProfile);
        Task<SongProfileDto> Get(string title, string artist);
        Task Update(SongProfileDto songProfileDto);
        Task<ChordChangeDto> UpsertChordChangeToSongProfile(PutChordChangeDto chordChange);
    }
}