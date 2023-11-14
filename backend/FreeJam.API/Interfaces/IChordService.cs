using FreeJam.API.DTOs;
using FreeJam.API.Models;

namespace FreeJam.API.Interfaces
{
    public interface IChordService {
        Task<bool> ChordExists(string shape);
        Task<(bool, ICollection<string>)> ChordsExists(ICollection<string> shapes);
        Task Add(ChordDto chord);
        Task<ICollection<ChordDto>> GetAll(string filter);
    }
}