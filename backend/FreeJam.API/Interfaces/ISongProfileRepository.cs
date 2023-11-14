using Microsoft.EntityFrameworkCore;
using FreeJam.API.Models;

namespace FreeJam.API.Interfaces
{
    public interface ISongProfileRepository : IRepository{
        DbSet<SongProfile> SongProfiles { get; }
    }
}