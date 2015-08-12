using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestCaseManager.Controllers
{
    public class TestPlanController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Test Plan";

            return View();
        }

        public ActionResult _Index()
        {
            return PartialView("_Index");
        }
    }
}