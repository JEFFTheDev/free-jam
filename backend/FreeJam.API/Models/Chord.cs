namespace FreeJam.API.Models
{
    public class Chord
    {
        public long Id { get; set; }
        public long Variant { get; set; }
        public string Name { get; set; } = "";
        public string Shape { get; set; } = ""; // For example, Am chord would look like: X02210
        public Enums.Instrument Instrument { get; set; }
    }
}
