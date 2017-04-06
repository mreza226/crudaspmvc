using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestApp.Models;

namespace TestApp.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        employeeDB edb = new employeeDB();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(edb.getAllEmployee(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(employee insert)
        {
            return Json(edb.Add(insert), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int id)
        {
            var employee = edb.getAllEmployee().Find(x => x.id.Equals(id));
            return Json(employee, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(employee update)
        {
            return Json(edb.Update(update), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(edb.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}
