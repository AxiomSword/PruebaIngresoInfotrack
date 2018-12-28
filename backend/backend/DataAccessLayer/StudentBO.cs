using backend.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace backend.DataAccessLayer
{
    public class StudentBO
    {
        backendContext DB;

        public StudentBO()
        {
            DB = new backendContext();
        }

        // Create student 
        public StudentDTO CreateStudent(Student student)
        {
            DB.Students.Add(student);
            DB.SaveChanges();

            var dto = new StudentDTO()
            {
                Id = student.Id,
                Name = student.Names + " " + student.Surnames
            };

            return dto;
        }

        // Get students
        public IQueryable<StudentDTO> GetStudents()
        {
            var students = from s in DB.Students
                           select new StudentDTO()
                           {
                               Id = s.Id,
                               Name = s.Names + " " + s.Surnames
                           };

            return students;
        }

        // Get student
        public Student GetStudent(int Id)
        {
            return DB.Students.Find(Id);
        }

        // Update student
        public Student UpdateStudent(Student model)
        {
            Student student = DB.Students.Where(s => s.Id == model.Id).SingleOrDefault();
            if (student != null)
            {
                DB.Entry(student).CurrentValues.SetValues(model);
                DB.SaveChanges();
                return model;
            }
            return null;
        }

        // Delete student
        public StudentDTO DeleteStudent(int Id)
        {
            Student student = DB.Students.Find(Id);
            DB.Students.Remove(student);
            DB.SaveChanges();
            var dto = new StudentDTO()
            {
                Id = student.Id,
                Name = student.Names + " " + student.Surnames
            };
            return dto;
        }
    }
}