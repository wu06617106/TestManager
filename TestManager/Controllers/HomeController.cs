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

        public ActionResult Register()
        {
            return View();
        }
        //Controller
        public ActionResult _Register()
        {
            return PartialView("_Register");
        }
    }
}
