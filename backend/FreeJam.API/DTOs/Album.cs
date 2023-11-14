using System.ComponentModel.DataAnnotations;

namespace FreeJam.API.DTOs
{
     public class AlbumDto
    {
        [Required]
        public string Title { get; set; } = "";
        
        [Required]
        public string Artist { get; set; } = "";
        
        [Required]
        public string ImageUrl { get; set; } = "";
        
        [Required]
        public DateTime ReleaseDate { get; set; }
        
        [Required, MinLength(1)]
        public SongDto[] Songs { get; set; } = { };
    }
}
