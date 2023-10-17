using System.ComponentModel.DataAnnotations;

namespace WebApplication5.DTOs
{
    public class ChordChangeDto
    {
        public long? Id { get; set; }
        
        [Required]
        public int ChordIndex { get; set; }

        [Required]
        public long AtMilliseconds { get; set; }

        [Required]
        public long Duration { get; set; }
    }
}
