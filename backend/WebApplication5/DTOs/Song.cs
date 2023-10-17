using System.ComponentModel.DataAnnotations;

namespace WebApplication5.DTOs
{
    public class SongDto
    {
        [Required]
        public string Artist { get; set; } = "";

        [Required]
        public string Title { get; set; } = "";

        /// <summary>
        /// VideoId as defined on YouTube
        /// </summary>
        public string? VideoId { get; set; }
        public bool HasSongProfile { get; set; }
    }
}
