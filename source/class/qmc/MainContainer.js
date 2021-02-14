qx.Class.define("qmc.MainContainer", {
  extend: qx.ui.core.Widget,

  construct() {
    this.base(arguments);

    this._setLayout(new qx.ui.layout.VBox());

    const toolbar = new qmc.views.ToolBar();
    this._add(toolbar);

    const mainView = new qmc.views.MainView();
    this._add(mainView, {flex: 1});
  }
});
