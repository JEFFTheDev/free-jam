namespace WebApplication5.Entities
{
    public class Album
    {
        public long Id { get; set; }
        public string Title { get; set; } = "";
        public int Released { get; set; }
        public string ImageUrl { get; set; } = "";
        public string Artist { get; set; } = "";
    }
}
