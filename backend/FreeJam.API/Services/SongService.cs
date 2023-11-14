using Microsoft.EntityFrameworkCore;
using FreeJam.API.DTOs;
using FreeJam.API.Interfaces;
using FreeJam.API.Models;

namespace FreeJam.API.Services
{
    public class SongService : ISongService
    {
        private readonly ISongRepository _songRepository;

        public SongService(ISongRepository songRepository) {
            this._songRepository = songRepository;
        }
        
        public async Task<bool> SongExists(string title, string artist)
        {
            return await this._songRepository.Songs.AnyAsync(x => x.Artist == artist && x.Title == title);
        }
    }
}