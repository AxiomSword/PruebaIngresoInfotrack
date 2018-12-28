using backend.DataAccessLayer;
using backend.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace backend.BusinessLayer.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class SubjectsController : ApiController
    {
        private SubjectBO SubjectBO;

        public SubjectsController()
        {
            SubjectBO = new SubjectBO();
        }

        // GET: api/Subjects
        public IEnumerable<Subject> Get()
        {
            return SubjectBO.GetSubjects();
        }

        // POST: api/Subjects
        public Subject Post([FromBody] Subject subject)
        {
            return SubjectBO.CreateSubject(subject);
        }

        // PUT: api/Subjects/5
        public Subject Put(Subject subject)
        {
            return SubjectBO.UpdateSubject(subject);
        }

        // DELETE: api/Subjects/5
        public Subject Delete(int Id)
        {
            return SubjectBO.DeleteSubject(Id);
        }

    }
}