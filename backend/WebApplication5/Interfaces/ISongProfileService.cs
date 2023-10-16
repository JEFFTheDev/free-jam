using WebApplication5.DTOs;
using WebApplication5.Models;

namespace WebApplication5.Interfaces
{
    public interface ISongProfileService {
        Task Add(SongProfileDto songProfile);
        Task<SongProfileDto> Get(string title, string artist);
        Task Update(SongProfileDto songProfileDto);
    }
}