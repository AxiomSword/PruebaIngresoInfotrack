using backend.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend.DataAccessLayer
{
    public class GradeBO
    {
        backendContext DB;

        public GradeBO()
        {
            DB = new backendContext();
        }

        // Register grade
        public Grade RegisterGrade(Grade grade)
        {
            DB.Grades.Add(grade);
            DB.SaveChanges();
            return grade;
        }

        // Get report
        public IQueryable<GradeDTO> GetReport(int StudentId)
        {
            var grades = from g in DB.Grades
                         where g.StudentId == StudentId
                         select new GradeDTO()
                         {
                             Id = g.Id,
                             StudentName = g.Student.Names + " " + g.Student.Surnames,
                             SubjectName = g.Subject.Name,
                             Value = g.Value
                         };
            return grades;
        }
    }
}