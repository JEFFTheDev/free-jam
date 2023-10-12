namespace WebApplication5.Entities
{
    public class ChordChange
    {
        public long Id { get; set; }
        public GuitarChord Chord { get; set; } = new GuitarChord();
        public long AtMilliseconds { get; set; }
        public long Duration { get; set; }
    }
}
