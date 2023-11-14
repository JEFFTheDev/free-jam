using FreeJam.API.DTOs;
using FreeJam.API.Models;

namespace FreeJam.API.Interfaces
{
    public interface ISongService {
        Task<bool> SongExists(string title, string artist);
    }
}