namespace FreeJam.API.Models
{
    public class ChordChange
    {
        public long Id { get; set; }
        public Chord Chord { get; set; } = new Chord();
        public long AtMilliseconds { get; set; }
        public long Duration { get; set; }
    }
}
