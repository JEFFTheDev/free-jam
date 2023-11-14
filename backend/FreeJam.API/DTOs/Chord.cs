using FreeJam.API.Enums;
using System.ComponentModel.DataAnnotations;

namespace FreeJam.API.DTOs
{
    public class ChordDto
    {
        public long Variant { get; set; }

        [Required]
        public string Name { get; set; } = "";

        [Required]
        public string Shape { get; set; } = "";
        
        [Required]
        public Instrument Instrument { get; set; } = Instrument.Unknown;
    }
}
