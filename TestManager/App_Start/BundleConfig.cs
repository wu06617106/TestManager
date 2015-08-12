using System.Web;
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

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate.min.js"));

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
                        "~/Scripts/angular.min.js",
                        "~/Scripts/angular-route.min.js",
                        "~/Scripts/loading-bar.min.js",
                        "~/Scripts/angular-local-storage.min.js",
                        "~/Scripts/AngularUITree/angular-ui-tree.min.js",
                        "~/Scripts/AngularLoadingBar/loading-bar.min.js",
                        "~/app/test-manager-app.js"));

            bundles.Add(new ScriptBundle("~/bundles/controllers").Include(
                        "~/app/Controllers/testCaseTreeController.js",
                        "~/app/Controllers/loginController.js",
                        "~/app/Controllers/registerController.js",
                        "~/app/Controllers/layoutController.js",
                        "~/app/Controllers/testPlanController.js",
                        "~/app/Controllers/initController.js"));

            bundles.Add(new ScriptBundle("~/bundles/directives").Include(
                        "~/app/Directives/testCaseTreeDirectives.js"));

            bundles.Add(new ScriptBundle("~/bundles/services").Include(
                        "~/app/Services/authInterceptorService.js",
                        "~/app/Services/authService.js",
                        "~/app/Services/testCaseTreeService.js",
                        "~/app/Services/testApiService.js"));
            
        }
    }
}
