using Microsoft.EntityFrameworkCore;
using WebApplication5.DTOs;
using WebApplication5.Interfaces;
using WebApplication5.Models;

namespace WebApplication5.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly IAlbumRepository _albumRepository;
        private readonly ISongRepository _songRepository;

        public AlbumService(IAlbumRepository _albumRepository, ISongRepository _songRepository)
        {
            this._albumRepository = _albumRepository;
            this._songRepository = _songRepository;
        }

        public async Task Add(AlbumDto album)
        {
            this._albumRepository.Albums.Add(new Album
            {
                Title = album.Title,
                Artist = album.Artist,
                ImageUrl = album.ImageUrl,
                Released = album.ReleaseDate,
            });
            await this._albumRepository.SaveChangesAsync();
        }

        public async Task<bool> AlbumExists(string title, string artist)
        {
            return await this._albumRepository.Albums.AnyAsync(x => x.Title == title && x.Artist == artist);
        }

        public async Task<ICollection<AlbumDto>> GetAll()
        {
            return await this._albumRepository.Albums.Select(x => new AlbumDto{
                Artist = x.Artist,
                Title = x.Title,
                ReleaseDate = x.Released,
                ImageUrl = x.ImageUrl,

                // Retrieve all songs that belong to this album
                Songs = _songRepository.Songs.Where(song => song.Album != null && song.Album.Id == x.Id).Select(song => new SongDto
                {
                    Title = song.Title,
                    VideoId = song.VideoId,
                }).ToArray(),
            }).ToArrayAsync();
        }
    }
}