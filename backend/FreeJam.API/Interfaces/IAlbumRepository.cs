using Microsoft.EntityFrameworkCore;
using FreeJam.API.Models;

namespace FreeJam.API.Interfaces
{
    public interface IAlbumRepository : IRepository {
        DbSet<Album> Albums { get; }
    }
}