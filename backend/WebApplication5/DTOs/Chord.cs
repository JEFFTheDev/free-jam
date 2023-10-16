using WebApplication5.Enums;

namespace WebApplication5.DTOs
{
    public class ChordDto
    {
        public long Variant { get; set; }
        public string? Name { get; set; }
        public string? Shape { get; set; }
        public Instrument Instrument { get; set; } = Instrument.Unknown;
    }
}
