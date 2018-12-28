using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.DataAccessLayer.Models
{
    public class Grade
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int StudentId { get; set; }
        public Student Student { get; set; }
        [Required]
        public int SubjectId { get; set; } 
        public Subject Subject { get; set; }
        public float Value { get; set; }
    }
}