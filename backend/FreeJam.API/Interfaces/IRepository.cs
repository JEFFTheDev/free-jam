using Microsoft.EntityFrameworkCore;
using FreeJam.API.Models;

namespace FreeJam.API.Interfaces
{
    public interface IRepository {
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}