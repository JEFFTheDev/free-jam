namespace WebApplication5.Entities
{
    public class GuitarChord
    {
        public long Id { get; set; }
        public long Variant { get; set; }
        public string? Name { get; set; }
        public string? Shape { get; set; } // For example, Am chord would look like: X02210
    }
}
