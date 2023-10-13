using Microsoft.EntityFrameworkCore;
using WebApplication5.Models;

namespace WebApplication5.Interfaces
{
    public interface IAlbumRepository : IRepository {
        DbSet<Album> Albums { get; }
    }
}