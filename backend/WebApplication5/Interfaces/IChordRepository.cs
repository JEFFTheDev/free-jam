using Microsoft.EntityFrameworkCore;
using WebApplication5.Models;

namespace WebApplication5.Interfaces
{
    public interface IChordRepository : IRepository {
        DbSet<Chord> Chords { get; }
        DbSet<ChordChange> ChordChanges { get; }
    }
}