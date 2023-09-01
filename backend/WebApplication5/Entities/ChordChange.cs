namespace WebApplication5.Entities
{
    public class ChordChange
    {
        public long Id { get; set; }
        public GuitarChord Chord { get; set; } = new GuitarChord();
        public long AtMiliseconds { get; set; }
        public long Duration { get; set; }
    }
}
