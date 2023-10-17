using Microsoft.EntityFrameworkCore;
using WebApplication5.DTOs;
using WebApplication5.Interfaces;
using WebApplication5.Models;

namespace WebApplication5.Services
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