namespace WebApplication5.Models
{
    public class Song
    {
        public long Id { get; set; }
        public string? Title { get; set; }
        public string? Artist { get; set; }
        public Album? Album { get; set; }
        public string? Tuning { get; set; }
        
        /// <summary>
        /// VideoId as defined on YouTube
        /// </summary>
        public string? VideoId { get; set; }
    }
}

// SongProfile
// Reference to Song
// List of chord changes at ms in the song
// Full profile is sent to frontend for fast handling