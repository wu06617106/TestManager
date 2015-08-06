using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using TestCaseManager.Models;

namespace TestCaseManager.Controllers
{
    public class TestCasesController : ApiController
    {
        private TestCaseManageModelContext db = new TestCaseManageModelContext();

        // POST: api/TestCases
        [HttpPost]
        [ResponseType(typeof(TestCase))]
        public async Task<IHttpActionResult> CreateTestCase(TestCase testCase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TestCases.Add(testCase);
            await db.SaveChangesAsync();
            return Ok(testCase);
        }

        // GET: api/TestCases
        [ResponseType(typeof(TestCaseDTO))]
        public IQueryable<TestCaseDTO> GetTestCases()
        {
            var testCasesDtos = from t in db.TestCases
                                select new TestCaseDTO()
                                {
                                    TestCaseId = t.TestCaseId,
                                    TestCaseTitle = t.TestCaseTitle,
                                    SectionId = t.SectionId,
                                    TypeId = t.TypeId,
                                    PriorityId = t.PriorityId,
                                    Estimate = t.Estimate,
                                    References = t.References,
                                    Preconditions = t.Preconditions,
                                    Steps = t.Steps,
                                    ExpectedResult = t.ExpectedResult
                                };
            return testCasesDtos;
        }

        // GET: api/TestCases/5
        [ResponseType(typeof(TestCaseDTO))]
        public async Task<IHttpActionResult> GetTestCase(int id)
        {
            TestCase testCase = await db.TestCases.FindAsync(id);
            if (testCase == null)
            {
                return NotFound();
            }
            TestCaseDTO testDTO = new TestCaseDTO();
            testDTO.TestCaseId = testCase.TestCaseId;
            testDTO.TestCaseTitle = testCase.TestCaseTitle;
            testDTO.SectionId = testCase.SectionId;
            testDTO.TypeId = testCase.TypeId;
            testDTO.PriorityId = testCase.PriorityId;
            testDTO.Estimate = testCase.Estimate;
            testDTO.References = testCase.References;
            testDTO.Preconditions = testCase.Preconditions;
            testDTO.Steps = testCase.Steps;
            testDTO.ExpectedResult = testCase.ExpectedResult;
            return Ok(testDTO);
        }

        // PUT: api/TestCases/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTestCase(TestCase testCase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(testCase).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        

        // DELETE: api/TestCases/5
        [ResponseType(typeof(TestCase))]
        public async Task<IHttpActionResult> DeleteTestCase(int id)
        {
            TestCase testCase = await db.TestCases.FindAsync(id);
            if (testCase == null)
            {
                return NotFound();
            }

            db.TestCases.Remove(testCase);
            await db.SaveChangesAsync();

            return Ok(testCase);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TestCaseExists(int id)
        {
            return db.TestCases.Count(e => e.TestCaseId == id) > 0;
        }
    }
}