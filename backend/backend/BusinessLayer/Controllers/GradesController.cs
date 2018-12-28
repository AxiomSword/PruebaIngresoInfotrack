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
    public class GradesController : ApiController
    {
        private GradeBO GradeBO;

        private GradesController()
        {
            GradeBO = new GradeBO();
        }

        // POST: api/Grades
        public Grade Post([FromBody] Grade grade)
        {
            return GradeBO.RegisterGrade(grade);
        }

        // GET: api/Grades/5
        public IQueryable<GradeDTO> Get(int Id)
        {
            return GradeBO.GetReport(Id);
        }
    }
}