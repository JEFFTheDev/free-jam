using Microsoft.EntityFrameworkCore;
using WebApplication5.DTOs;
using WebApplication5.Interfaces;
using WebApplication5.Models;

namespace WebApplication5.Services
{
    public class ChordService : IChordService
    {
        private readonly IChordRepository _chordRepository;

        public ChordService(IChordRepository chordRepository) {
            this._chordRepository = chordRepository;
        }

        public async Task Add(ChordDto chord)
        {
            this._chordRepository.Chords.Add(new Chord{
                Name = chord.Name,
                Shape = chord.Shape,
                Variant = chord.Variant,
                Instrument = chord.Instrument,
            });
            await this._chordRepository.SaveChangesAsync();
        }

        public async Task<bool> ChordExists(string shape)
        {
            return await this._chordRepository.Chords.AnyAsync(x => x.Shape == shape);
        }

        public async Task<(bool, ICollection<string>)> ChordsExists(ICollection<string> shapes)
        {
            var existingShapes = await this._chordRepository.Chords.Where(x => shapes.Contains(x.Shape)).Select(x => x.Shape).ToListAsync();
            var missingChords = shapes.Where(x => !existingShapes.Contains(x)).ToList();
            return (existingShapes.Count == shapes.Count(), missingChords);
        }

        public async Task<ICollection<ChordDto>> GetAll(string filter)
        {
            return await this._chordRepository.Chords.Where(x => x.Name.Contains(filter)).Select(x => new ChordDto{
                Name = x.Name,
                Shape = x.Shape,
                Variant = x.Variant,
                Instrument = x.Instrument,
            }).ToListAsync();
        }
    }
}