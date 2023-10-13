using Microsoft.EntityFrameworkCore;
using WebApplication5.DTOs;
using WebApplication5.Interfaces;
using WebApplication5.Models;

namespace WebApplication5.Repositories
{
    // TODO: how does this way of exposing (using interfaces as services) impact performance??
    public class Repository : IAlbumRepository, IChordRepository, ISongProfileRepository, ISongRepository
    {
        public DbSet<Album> Albums => this._dbContext.Albums;
        public DbSet<Chord> Chords => this._dbContext.Chords;
        public DbSet<ChordChange> ChordChanges => this._dbContext.ChordChanges;
        public DbSet<SongProfile> SongProfiles => this._dbContext.SongProfiles;
        public DbSet<Song> Songs => this._dbContext.Songs;

        private readonly Data.ApplicationDbContext _dbContext;

        public Repository(Data.ApplicationDbContext _dbContext) {
            this._dbContext = _dbContext;
        }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return this._dbContext.SaveChangesAsync();
        }
    }
}