using Microsoft.EntityFrameworkCore;
using FreeJam.API.Models;

namespace FreeJam.API.Interfaces
{
    public interface IChordRepository : IRepository {
        DbSet<Chord> Chords { get; }
        DbSet<ChordChange> ChordChanges { get; }
    }
}