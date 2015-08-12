using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestCaseManager.Controllers
{
    public class TestPlanController : Controller
    {
        public ActionResult AddTestPlan()
        {
            ViewBag.Title = "Add Test Plan";

            return View();
        }

        public ActionResult _AddTestPlan()
        {
            return PartialView("_AddTestPlan");
        }
    }
}