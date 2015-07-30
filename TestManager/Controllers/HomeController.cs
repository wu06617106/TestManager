using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestCaseManager.Controllers
{
    public class HomeController : Controller
    {
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
