qx.Class.define("qmc.views.MainView", {
  extend: qx.ui.splitpane.Pane,

  construct(orientation = "horizontal") {
    this.base(arguments, orientation);

    this.__createEditorPane();
    this._addServices();
    this._addEditor();
    this._addLog();
  },

  members: {
    __editorPane: null,
    __editor: null,

    __logView: null,
    __logController: null,

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
      this.__services = new qmc.views.Services().set({
        maxWidth: 200
      });
      this.__editorPane.add(this.__services, 1);
    },

    _addLog() {
      this.__log = new qmc.views.Log()
      const service = qmc.service.Service.getInstance();
      this.__logController = new qmc.controllers.Log(this.__log, service);
      this.add(this.__log, 1);
    }
  }
});
