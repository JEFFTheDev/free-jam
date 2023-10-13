using Microsoft.EntityFrameworkCore;
using WebApplication5.Models;
using WebApplication5.Interfaces;

namespace WebApplication5.Data
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
