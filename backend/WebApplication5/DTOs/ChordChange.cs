using System.ComponentModel.DataAnnotations;

namespace WebApplication5.DTOs
{
    public class ChordChangeDto
    {
        [Required]
        public int ChordIndex { get; set; }

        [Required]
        public long AtMilliseconds { get; set; }

        [Required]
        public long Duration { get; set; }
    }
}
