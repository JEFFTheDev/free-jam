using System.ComponentModel.DataAnnotations;
using WebApplication5.Models;

namespace WebApplication5.DTOs
{
    public class PutChordChangeDto
    {
        public long? Id { get; set; }

        [Required]
        public string SongTitle { get; set; } = "";
        
        [Required]
        public string SongArtist { get; set; } = "";

        [Required]
        public ChordDto Chord { get; set; } = new ChordDto();

        [Required]
        public long AtMilliseconds { get; set; }

        [Required]
        public long Duration { get; set; }
    }
}
