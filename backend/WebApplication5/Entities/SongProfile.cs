namespace WebApplication5.Entities
{
    public class SongProfile
    {
        public long Id { get; set; }
        public Song Song { get; set; }
        public ICollection<ChordChange> Changes { get; set; }
    }
}
