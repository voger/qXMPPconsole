/* ************************************************************************

   Copyright: 2021 

   License: MIT license

   Authors: voger

************************************************************************ */

/**
 * This is the main application class of "qXMPPconsole"
 *
 * @asset(qmc/*)
 */
qx.Class.define("qmc.Application", {
  extend: qx.application.Standalone,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members: {
    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     *
     * @lint ignoreDeprecated(alert)
     */
    main: function () {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug")) {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      // patch the qx.ui.toolbar.Part to respect flex
      qx.Class.patch(qx.ui.toolbar.Part, qmc.patch.MFixPartFlex);

      // Document is the application root
      const doc = this.getRoot();
      const mainContainer = new qmc.MainContainer();
      doc.add(mainContainer, {edge: 0});
    }
  }
});
