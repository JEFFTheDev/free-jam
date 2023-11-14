using Microsoft.EntityFrameworkCore;
using FreeJam.API.DTOs;
using FreeJam.API.Interfaces;
using FreeJam.API.Models;

namespace FreeJam.API.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly IAlbumRepository _albumRepository;
        private readonly ISongRepository _songRepository;
        private readonly ISongProfileRepository _songProfileRepository;

        public AlbumService(IAlbumRepository albumRepository, ISongRepository songRepository, ISongProfileRepository songProfileRepository)
        {
            this._albumRepository = albumRepository;
            this._songRepository = songRepository;
            this._songProfileRepository = songProfileRepository;
        }

        public async Task Add(AlbumDto album)
        {
            var a = new Album
            {
                Title = album.Title,
                Artist = album.Artist,
                ImageUrl = album.ImageUrl,
                Released = album.ReleaseDate,
            };
            this._albumRepository.Albums.Add(a);
            this._songRepository.Songs.AddRange(album.Songs.Select(x => new Song{
                Album = a,
                Artist = a.Artist,
                Title = x.Title,
                VideoId = x.VideoId,
            }));
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