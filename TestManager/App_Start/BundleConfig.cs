﻿using System.Web;
using System.Web.Optimization;

namespace TestCaseManager
{
    public class BundleConfig
    {
        // 如需「搭配」的詳細資訊，請瀏覽 http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // 使用開發版本的 Modernizr 進行開發並學習。然後，當您
            // 準備好實際執行時，請使用 http://modernizr.com 上的建置工具，只選擇您需要的測試。
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/ui-bootstrap-tpls-{version}.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/tree.css",
                      "~/Content/bootstrap.min.css",
                      "~/Content/loading-bar.css",
                      "~/Content/angular-ui-tree.min.css"));

            bundles.Add(new ScriptBundle("~/bundles/angularJS").Include(
                        "~/Scripts/angular.js",
                        "~/Scripts/angular-route.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularJSLayout").Include(
                        "~/app/Layout/inital.js",
                        "~/app/Layout/angular-local-storage.min.js",
                        "~/app/Layout/authInterceptorService.js",
                        "~/app/Layout/loading-bar.min.js",
                        "~/app/Layout/authService.js"));

        }
    }
}
