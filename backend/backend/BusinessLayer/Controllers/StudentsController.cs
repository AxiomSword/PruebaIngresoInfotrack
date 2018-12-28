using backend.DataAccessLayer;
using backend.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace backend.BusinessLayer.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class StudentsController : ApiController
    {
        private StudentBO StudentBO;

        public StudentsController()
        {
            StudentBO = new StudentBO();
        }

        // GET: api/Students
        public IQueryable<StudentDTO> Get()
        {
            return StudentBO.GetStudents();
        }

        // GET: api/Students/5
        public Student Get(int Id)
        {
            return StudentBO.GetStudent(Id);
        }
        
        // POST: api/Students
        public StudentDTO Post([FromBody]Student student)
        {
            return StudentBO.CreateStudent(student);
        }

        // PUT: api/Students/5
        public Student Put(Student student)
        {
            return StudentBO.UpdateStudent(student);
        }

        // DELETE: api/Students/5
        public StudentDTO Delete(int Id)
        {
            return StudentBO.DeleteStudent(Id);
        }
    }
}
