using Microsoft.EntityFrameworkCore;
using WebApplication5.Entities;

namespace WebApplication5
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        public DbSet<Album> Albums { get; set; }

        public DbSet<Song> Songs { get; set; }
        public DbSet<SongProfile> SongProfiles { get; set; }
        public DbSet<GuitarChord> GuitarChords { get; set; }
    }
}
