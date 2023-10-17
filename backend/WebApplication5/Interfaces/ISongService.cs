using WebApplication5.DTOs;
using WebApplication5.Models;

namespace WebApplication5.Interfaces
{
    public interface ISongService {
        Task<bool> SongExists(string title, string artist);
    }
}