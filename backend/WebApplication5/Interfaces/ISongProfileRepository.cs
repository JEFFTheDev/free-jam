using Microsoft.EntityFrameworkCore;
using WebApplication5.Models;

namespace WebApplication5.Interfaces
{
    public interface ISongProfileRepository : IRepository{
        DbSet<SongProfile> SongProfiles { get; }
    }
}