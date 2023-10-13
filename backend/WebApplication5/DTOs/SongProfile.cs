namespace WebApplication5.DTOs
{
    public class SongProfileDto
    {
        public string Tuning { get; set; } = "";
        public DTOs.SongDto Song { get; set; }
        public ICollection<ChordChangeDto> Changes { get; set; }
        public ICollection<ChordDto> Chords { get; set; }
    }
}
