using System.ComponentModel.DataAnnotations;

namespace WebApplication5.DTOs
{
    public class SongProfileDto
    {
        [Required]
        public string Tuning { get; set; } = "";

        [Required]
        public SongDto Song { get; set; } = new SongDto();
        
        [Required]
        public ICollection<ChordChangeDto> Changes { get; set; } = new ChordChangeDto[] { };
        
        [Required]
        public ICollection<ChordDto> Chords { get; set; } = new ChordDto[] { };
    }
}
