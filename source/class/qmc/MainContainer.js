qx.Class.define("qmc.MainContainer", {
  extend: qx.ui.splitpane.Pane,

  construct(orientation = "horizontal") {
    this.base(arguments, orientation);
    this.__createEditorPane();
    this._addHistory();
    this._addEditor();
    this._addStream();
  },

  members: {
    __editorPane: null,

    __createEditorPane() {
      this.__editorPane = new qx.ui.splitpane.Pane("vertical");
      this.add(this.__editorPane, 1);
    },

    _addEditor() {
      const editor = new qmc.views.Editor();
      editor.setMinHeight(200);
      this.__editorPane.add(editor, 0);
    },

    _addHistory() {
      const history = new qx.ui.core.Widget().set({
        maxWidth: 200
      });
      this.__editorPane.add(history, 1);
    },

    _addStream() {
      const stream = new qmc.views.Stream();
      this.add(stream, 1);
    }
  }
});
