namespace WebApplication5.DTOs
{
    public class SongDto
    {
        public string? Artist { get; set; }
        public string? Title { get; set; }

        /// <summary>
        /// VideoId as defined on YouTube
        /// </summary>
        public string? VideoId { get; set; }
        public bool HasSongProfile { get; set; }
    }
}
