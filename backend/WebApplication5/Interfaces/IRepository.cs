using Microsoft.EntityFrameworkCore;
using WebApplication5.Models;

namespace WebApplication5.Interfaces
{
    public interface IRepository {
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}