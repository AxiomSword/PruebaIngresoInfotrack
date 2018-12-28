using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.DataAccessLayer.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Names { get; set; }
        [Required]
        public string Surnames { get; set; }
        public DateTime BirthDate { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
    }
}