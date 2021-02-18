qx.Class.define("qmc.views.MainView", {
  extend: qx.ui.splitpane.Pane,

  construct(orientation = "horizontal") {
    this.base(arguments, orientation);
    this.__service = qmc.Service.getInstance();

    this.__createEditorPane();
    this._addServices();
    this._addEditor();
    this._addLogView();
  },

  members: {
    __editorPane: null,
    __editor: null,

    __logView: null,
    __logController: null,

    // the strophe.js service
    __service: null,

    // discovered services
    __services: null,

    getEditor() {
      return this.__editor;
    },

    getLogView() {
      return this.__logView;
    },

    getServices() {
      return this.__services;
    },

    __createEditorPane() {
      this.__editorPane = new qx.ui.splitpane.Pane("vertical");
      this.add(this.__editorPane, 1);
    },

    _addEditor() {
      this.__editor = new qmc.views.Editor().set({
        minHeight: 200
      });
      this.__editorPane.add(this.__editor, 0);
    },

    _addServices() {
      this.__services = new qx.ui.core.Widget().set({
        maxWidth: 200
      });
      this.__editorPane.add(this.__services, 1);
    },

    _addLogView() {
      this.__logView = new qmc.views.LogView();
      this.__logController = new qmc.controllers.Log(this.__logView, this.__service);
      this.add(this.__logView, 1);
    }
  }
});
