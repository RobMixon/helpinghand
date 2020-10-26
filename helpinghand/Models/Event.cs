﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace helpinghand.Models
{
    public class Event
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        public DateTime CreateDateTime { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Comments { get; set; }

    }
}
