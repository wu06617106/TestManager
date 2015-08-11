using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TestCaseManager.Models;

namespace TestCaseManager.Controllers
{
    public class TestCaseController : Controller
    {
        private TestCaseManageModelContext db = new TestCaseManageModelContext();
        public ActionResult Index()
        {
            ViewBag.Title = "Test Case List";

            return View();
        }

        public ActionResult _Index()
        {
            return PartialView("_Index");
        }


        public ActionResult EditTestCase(int? id)
        {
            ViewBag.Title = "Edit Test Case";

            return View();
        }

        public ActionResult _EditTestCase(int? id)
        {
            ViewBag.Title = "Edit Test Case";
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TestCase testCase = db.TestCases.Find(id);
            if (testCase == null)
            {
                return HttpNotFound();
            }
            ViewBag.PriorityId = new SelectList(db.Priorities, "PriorityId", "PriorityName", testCase.PriorityId);
            ViewBag.SectionId = new SelectList(db.Sections, "SectionId", "SectionTitle", testCase.SectionId);
            ViewBag.TypeId = new SelectList(db.Types, "TypeId", "TypeName", testCase.TypeId);
            return PartialView("_EditTestCase", testCase);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult _EditTestCase([Bind(Include = "TestCaseId,TestCaseTitle,LastEditPerson,SectionId,TypeId,PriorityId,Estimate,References,Preconditions,Steps,ExpectedResult")] TestCase testCase)
        {
            if (ModelState.IsValid)
            {
                db.Entry(testCase).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.PriorityId = new SelectList(db.Priorities, "PriorityId", "PriorityName", testCase.PriorityId);
            ViewBag.SectionId = new SelectList(db.Sections, "SectionId", "SectionTitle", testCase.SectionId);
            ViewBag.TypeId = new SelectList(db.Types, "TypeId", "TypeName", testCase.TypeId);
            return PartialView("_EditTestCase", testCase);
        }


        public ActionResult TestCasesDetails(int? id)
        {
            return View();
        }

        public ActionResult _TestCasesDetails(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TestCase testCase = db.TestCases.Find(id);
            if (testCase == null)
            {
                return HttpNotFound();
            }
            return PartialView("_TestCasesDetails", testCase);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}