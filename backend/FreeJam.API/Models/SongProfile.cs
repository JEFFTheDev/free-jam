namespace FreeJam.API.Models
{
    public class SongProfile
    {
        public long Id { get; set; }
        public string Tuning {get; set;} = "";
        public Song Song { get; set; }
        public ICollection<ChordChange> Changes { get; set; }
    }
}
