using backend.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend.DataAccessLayer
{
    public class SubjectBO
    {
        backendContext DB;

        public SubjectBO ()
        {
            DB = new backendContext();
        }

        // Create subject
        public Subject CreateSubject(Subject subject)
        {
            DB.Subjects.Add(subject);
            DB.SaveChanges();
            return subject;
        }

        // Get subjects
        public IEnumerable<Subject> GetSubjects()
        {
            return DB.Subjects;
        }

        // Update subject
        public Subject UpdateSubject(Subject model)
        {
            Subject subject = DB.Subjects.Where(s => s.Id == model.Id).SingleOrDefault();
            if (subject != null)
            {
                DB.Entry(subject).CurrentValues.SetValues(model);
                DB.SaveChanges();
                return model;
            }
            return null;
        }

        // Delete subject
        public Subject DeleteSubject(int Id)
        {
            Subject subject = DB.Subjects.Find(Id);
            DB.Subjects.Remove(subject);
            DB.SaveChanges();
            return subject;
        }
    }
}