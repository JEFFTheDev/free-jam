using Microsoft.EntityFrameworkCore;
using FreeJam.API.Models;
using FreeJam.API.Interfaces;

namespace FreeJam.API.Data
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
        public DbSet<Chord> Chords { get; set; }
        public DbSet<ChordChange> ChordChanges { get; set; }
    }
}
