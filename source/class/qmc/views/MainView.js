qx.Class.define("qmc.views.MainView", {
  extend: qx.ui.splitpane.Pane,

  construct(orientation = "horizontal") {
    this.base(arguments, orientation);
    this.__service = qmc.Service.getInstance();

    this.__createEditorPane();
    this._addHistory();
    this._addEditor();
    this._addStream();
  },

  members: {
    __editorPane: null,
    __editor: null,

    __stream: null,
    __streamController: null,

    __service: null,

    getEditor() {
      return this.__editor;
    },

    getStream() {
      return this.__stream;
    },

    getHistory() {
      return this.__history;
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

    _addHistory() {
      this.__history = new qx.ui.core.Widget().set({
        maxWidth: 200
      });
      this.__editorPane.add(this.__history, 1);
    },

    _addStream() {
      this.__stream = new qmc.views.Stream();
      this.__streamController = new qmc.controllers.Stream(this.__stream, this.__service);
      this.add(this.__stream, 1);
    }
  }
});
