using WebApplication5.DTOs;
using WebApplication5.Models;

namespace WebApplication5.Interfaces
{
    public interface IAlbumService {
        Task<bool> AlbumExists(string title, string artist);
        Task Add(AlbumDto album);
        Task<ICollection<AlbumDto>> GetAll();
    }
}