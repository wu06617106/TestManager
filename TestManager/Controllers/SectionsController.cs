using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using TestCaseManager.Models;

namespace TestCaseManager.Controllers
{
    public class SectionsController : ApiController
    {
        private TestCaseManageModelContext db = new TestCaseManageModelContext();

        //for CreateSection
        [HttpPost]
        [ResponseType(typeof(Section))]
        public async Task<IHttpActionResult> CreateSection(Section section)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Sections.Add(section);
            await db.SaveChangesAsync();

            return Ok(section);
        }

        [HttpPut]
        [ResponseType(typeof(Section))]
        public async Task<IHttpActionResult> EditSection(Section data)
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

        [HttpPut]
        [ResponseType(typeof(Section))]
        public async Task<IHttpActionResult> EditSectionTitle([FromUri]int id, [FromUri] string sectionTitle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var section = await db.Sections.FindAsync(id);

            if (section == null)
            {
                return NotFound();
            }

            section.SectionTitle = sectionTitle;

            db.Entry(section).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
            return Ok(section);
        }

        [HttpPut]
        [ResponseType(typeof(Section))]
        public async Task<IHttpActionResult> EditSectionChild([FromUri]int id,[FromUri] string childIdString)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var section = await db.Sections.FindAsync(id);

            if (section == null)
            {
                return NotFound();
            }

            section.ChildSectionIdList = childIdString;

            db.Entry(section).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
            return Ok(section);
        }

        // GET: api/Sections
        public IQueryable<Section> GetSections()
        {
            return db.Sections;
        }

        // GET: api/Sections/5
        [ResponseType(typeof(Section))]
        public async Task<IHttpActionResult> GetSection(int id)
        {
            Section section = await db.Sections.FindAsync(id);
            if (section == null)
            {
                return NotFound();
            }

            return Ok(section);
        }

        // DELETE: api/Sections/5
        [ResponseType(typeof(Section))]
        public async Task<IHttpActionResult> DeleteSection(int id)
        {
            Section section = await db.Sections.FindAsync(id);
            if (section == null)
            {
                return NotFound();
            }

            db.Sections.Remove(section);
            await db.SaveChangesAsync();

            return Ok(section);
        }

        // DELETE: api/Sections/5
        [ResponseType(typeof(Section))]
        public async Task<IHttpActionResult> DeleteSectionTree(int id)
        {
            Section section = await db.Sections.FindAsync(id);
            if (section == null)
            {
                return NotFound();
            }
            string sectionChildIdString = section.ChildSectionIdList;
            string[] sectionChildArray = Regex.Split(sectionChildIdString, " ");
            if(section.ParentId != null)
            {
                Section parentSection = await db.Sections.FindAsync(section.ParentId);
                string childIdString = parentSection.ChildSectionIdList;
                string[] childArray = Regex.Split(childIdString, " ");
                childIdString = "";
                foreach (var item in childArray)   //from parent to delete this child 
                {
                    if (item != " " && item != id.ToString() && item != "")
                    {
                        childIdString = childIdString + " " + item;
                    }
                }
                parentSection.ChildSectionIdList = childIdString;
                db.Entry(section).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
            foreach (var item in sectionChildArray)  //Delete the all child
            {
                if (item != " " && item != "")
                {
                    int idTemp = Convert.ToInt16(item);
                    await DeleteSectionTree(idTemp);
                }
            }
            db.Sections.Remove(section);
            await db.SaveChangesAsync();
            return Ok(section);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SectionExists(int id)
        {
            return db.Sections.Count(e => e.SectionId == id) > 0;
        }
    }
}