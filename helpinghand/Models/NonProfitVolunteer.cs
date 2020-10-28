using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace helpinghand.Models
{
    public class NonProfitVolunteer
    {
        public int Id { get; set; }
        [Required]
        public int NonProfitId { get; set; }
        public NonProfit NonProfit { get; set; }
        [Required]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
