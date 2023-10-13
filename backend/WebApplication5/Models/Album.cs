namespace WebApplication5.Models
{
    public class Album
    {
        public long Id { get; set; }
        public string Title { get; set; } = "";
        public DateTime Released { get; set; }
        public string ImageUrl { get; set; } = "";
        public string Artist { get; set; } = "";
    }
}
