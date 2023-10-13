namespace WebApplication5.DTOs
{
     public class AlbumDto
    {
        public string Title { get; set; } = "";
        public string Artist { get; set; } = "";
        public string ImageUrl { get; set; } = "";
        public DateTime ReleaseDate { get; set; }
        public SongDto[] Songs { get; set; } = { };
    }
}
