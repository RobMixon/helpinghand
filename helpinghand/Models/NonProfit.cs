using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace helpinghand.Models
{
    public class NonProfit
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public UserProfile UserProfile { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        public string Location { get; set; }
        public string Cause { get; set; }
        public string Description { get; set; }
        public string MissionStatement { get; set; }
        public string Website { get; set; }
    }
}
