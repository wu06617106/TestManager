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
    public class PersonsController : ApiController
    {
        private TestCaseManageModelContext db = new TestCaseManageModelContext();

        //for Log In
        [HttpPost]
        [ResponseType(typeof(Person))]
        public async Task<IHttpActionResult> LogIn(PersonDTO personData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var person = db.Persons.Where(p => p.Account == personData.Account && p.Password == personData.Password);

            if (person == null)
            {
                return NotFound();
            }

            return Ok(person);
        }

        //for Register
        public async Task<IHttpActionResult> Register(Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Persons.Add(person);
            await db.SaveChangesAsync();

            return Ok(person);
            //return CreatedAtRoute("DefaultApi", new { id = person.PersonId }, person);
        }

        [HttpPost]
        [ResponseType(typeof(Person))]
        public async Task<IHttpActionResult> EditPerson(Person data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(data).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
            return Ok(data);
        }


        // GET: api/Persons
        public IQueryable<Person> GetPersons()
        {
            return db.Persons;
        }

        // GET: api/Persons/5
        [ResponseType(typeof(Person))]
        public async Task<IHttpActionResult> GetPerson(int id)
        {
            Person person = await db.Persons.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            return Ok(person);
        }


        // DELETE: api/Persons/5
        [ResponseType(typeof(Person))]
        public async Task<IHttpActionResult> DeletePerson(int id)
        {
            Person person = await db.Persons.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            db.Persons.Remove(person);
            await db.SaveChangesAsync();

            return Ok(person);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PersonExists(int id)
        {
            return db.Persons.Count(e => e.PersonId == id) > 0;
        }
    }
}