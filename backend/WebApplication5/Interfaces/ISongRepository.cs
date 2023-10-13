using Microsoft.EntityFrameworkCore;
using WebApplication5.Models;

namespace WebApplication5.Interfaces
{
    public interface ISongRepository : IRepository {
        DbSet<Song> Songs { get; }
    }
}