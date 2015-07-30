using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestCaseManager.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Login()
        {
            ViewBag.Title = "Login Page";

            return View();
        }

        //Controller

        public ActionResult SPApage1()

        {

            return PartialView("Login");

        }


        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult TestSection()
        {
            ViewBag.Title = "Test Section Page";

            return View();
        }

        public ActionResult TestTestCase()
        {
            ViewBag.Title = "Test TestCase Page";

            return View();
        }
    }
}
