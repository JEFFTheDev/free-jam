using WebApplication5.DTOs;
using WebApplication5.Models;

namespace WebApplication5.Interfaces
{
    public interface IChordService {
        Task<bool> ChordExists(string shape);
        Task<(bool, ICollection<string>)> ChordsExists(ICollection<string> shapes);
        Task Add(ChordDto chord);
        Task<ICollection<ChordDto>> GetAll();
    }
}