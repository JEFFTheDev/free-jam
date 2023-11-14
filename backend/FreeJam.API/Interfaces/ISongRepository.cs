using Microsoft.EntityFrameworkCore;
using FreeJam.API.Models;

namespace FreeJam.API.Interfaces
{
    public interface ISongRepository : IRepository {
        DbSet<Song> Songs { get; }
    }
}