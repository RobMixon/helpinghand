using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace helpinghand.Models
{
    public class NonProfitEvent
    {
        public int Id { get; set; }
        [Required]
        public int NonProfitId { get; set; }
        public NonProfit NonProfit { get; set; }
        [Required]
        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}
