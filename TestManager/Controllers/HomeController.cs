using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TestCaseManager.Models;

namespace TestCaseManager.Controllers
{
    public class HomeController : Controller
    {
        private TestCaseManageModelContext db = new TestCaseManageModelContext();
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult _Index()
        {
            return PartialView("_Index");
        }

        public ActionResult Login()
        {
            return View();
        }
        //Controller
        public ActionResult _Login()
        {
            return PartialView("_Login");
        }

        public ActionResult Register()
        {
            return View();
        }
        //Controller
        public ActionResult _Register()
        {
            return PartialView("_Register");
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
    }
}
