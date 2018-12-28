using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend.DataAccessLayer.Models
{
    public class GradeDTO
    {
        public int Id { get; set; }
        public string StudentName { get; set; }
        public string SubjectName { get; set; }
        public float Value { get; set; }
    }
}