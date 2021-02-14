/**
 * @ignore(ace.edit)
 *
 */
qx.Class.define("qmc.views.Stream", {
  extend: qx.ui.core.Widget,

  construct() {
    this.base(arguments);
    this.addListenerOnce("appear", this._onAppear, this);
  },

  members: {
    __ace: null,

    _onAppear() {
      const container = this.getContentElement().getDomElement();
      const editor = (this.__ace = ace.edit(container));

      // consfigure the editor
      editor.setTheme("ace/theme/xcode");
      editor.setShowPrintMargin(false);
      editor.setReadOnly(true);
      const session = editor.getSession();
      session.setMode("ace/mode/xml");
      session.setUseSoftTabs(true);
      session.setTabSize(2);
      session.setValue("");

      this.addListener("resize", () => {
        // use a timeout to let the layout queue apply its changes to the dom
        qx.event.Timer.once( () => {
            this.__ace.resize();
          }, null, 500);
      });
    }
  }
});
