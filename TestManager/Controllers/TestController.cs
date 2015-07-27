using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TestCaseManager.Models;

namespace TestCaseManager.Controllers
{
    public class TestController : Controller
    {
        private TestCaseManageModelContext db = new TestCaseManageModelContext();

        // GET: Test
        public ActionResult Index()
        {
            var testCases = db.TestCases.Include(t => t.Priority).Include(t => t.Section).Include(t => t.Type);
            return View(testCases.ToList());
        }

        // GET: Test/Details/5
        public ActionResult Details(int? id)
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
            return View(testCase);
        }

        // GET: Test/Create
        public ActionResult Create()
        {
            ViewBag.PriorityId = new SelectList(db.Priorities, "PriorityId", "PriorityName");
            ViewBag.SectionId = new SelectList(db.Sections, "SectionId", "SectionTitle");
            ViewBag.TypeId = new SelectList(db.Types, "TypeId", "TypeName");
            return View();
        }

        // POST: Test/Create
        // 若要免於過量張貼攻擊，請啟用想要繫結的特定屬性，如需
        // 詳細資訊，請參閱 http://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "TestCaseId,TestCaseTitle,SectionId,TypeId,PriorityId,Estimate,References,Preconditions,Steps,ExpectedResult")] TestCase testCase)
        {
            if (ModelState.IsValid)
            {
                db.TestCases.Add(testCase);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.PriorityId = new SelectList(db.Priorities, "PriorityId", "PriorityName", testCase.PriorityId);
            ViewBag.SectionId = new SelectList(db.Sections, "SectionId", "SectionTitle", testCase.SectionId);
            ViewBag.TypeId = new SelectList(db.Types, "TypeId", "TypeName", testCase.TypeId);
            return View(testCase);
        }

        // GET: Test/Edit/5
        public ActionResult Edit(int? id)
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
            ViewBag.PriorityId = new SelectList(db.Priorities, "PriorityId", "PriorityName", testCase.PriorityId);
            ViewBag.SectionId = new SelectList(db.Sections, "SectionId", "SectionTitle", testCase.SectionId);
            ViewBag.TypeId = new SelectList(db.Types, "TypeId", "TypeName", testCase.TypeId);
            return View(testCase);
        }

        // POST: Test/Edit/5
        // 若要免於過量張貼攻擊，請啟用想要繫結的特定屬性，如需
        // 詳細資訊，請參閱 http://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "TestCaseId,TestCaseTitle,SectionId,TypeId,PriorityId,Estimate,References,Preconditions,Steps,ExpectedResult")] TestCase testCase)
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
            return View(testCase);
        }

        // GET: Test/Delete/5
        public ActionResult Delete(int? id)
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
            return View(testCase);
        }

        // POST: Test/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TestCase testCase = db.TestCases.Find(id);
            db.TestCases.Remove(testCase);
            db.SaveChanges();
            return RedirectToAction("Index");
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
