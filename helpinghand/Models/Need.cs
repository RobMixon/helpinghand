using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace helpinghand.Models
{
    public class Need
    {
        public int Id { get; set; }
        [Required]
        public int NonProfitId { get; set; }
        [MaxLength(50)]
        public string Item { get; set; }
        public string Quantity { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }

    }
}
