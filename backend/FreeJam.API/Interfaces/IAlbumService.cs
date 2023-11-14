using FreeJam.API.DTOs;
using FreeJam.API.Models;

namespace FreeJam.API.Interfaces
{
    public interface IAlbumService {
        Task<bool> AlbumExists(string title, string artist);
        Task Add(AlbumDto album);
        Task<ICollection<AlbumDto>> GetAll();
    }
}