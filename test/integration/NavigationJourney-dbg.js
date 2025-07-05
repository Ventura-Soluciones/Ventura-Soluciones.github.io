sap.ui.define(["sap/ui/test/opaQunit", "./pages/AppPage", "./pages/View1Page", "sap/ui/test/Opa5"], function (opaTest, __AppPage, __ViewPage, Opa5) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const AppPage = _interopRequireDefault(__AppPage);
  const ViewPage = _interopRequireDefault(__ViewPage);
  QUnit.module("Navigation Journey");
  const onTheAppPage = new AppPage();
  const onTheViewPage = new ViewPage();
  Opa5.extendConfig({
    viewNamespace: "com.vs.extension.finanb1.view.",
    autoWait: true
  });
  opaTest("Should see the initial page of the app", function () {
    // Arrangements
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    onTheAppPage.iStartMyUIComponent({
      componentConfig: {
        name: "com.vs.extension.finanb1"
      }
    });

    // Assertions
    onTheAppPage.iShouldSeeTheApp();
    onTheViewPage.iShouldSeeThePageView();

    // Cleanup
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    onTheAppPage.iTeardownMyApp();
  });
});
//# sourceMappingURL=NavigationJourney-dbg.js.map
