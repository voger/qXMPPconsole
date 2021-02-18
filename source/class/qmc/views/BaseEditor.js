/**
 * Base editor class.
 * @ignore(ace.edit)
 *
 */
qx.Class.define("qmc.views.BaseEditor", {
  extend: qx.ui.core.Widget,
  include: [qx.ui.core.MRemoteChildrenHandling],

  properties: {
    fontSize: {
      check: "Integer",
      apply: "_applyFontSize",
      nullable: false,
      init: 16,
      themeable: true,
      event: "changeFontSize"
    },

    readOnly: {
      check: "Boolean",
      apply: "_applyReadOnly",
      init: false,
      nullable: false,
      event: "changeReadOnly"
    }
  },

  construct() {
    this.base(arguments);

    this.addListenerOnce("appear", this._onAppear, this);
    this._setLayout(new qx.ui.layout.VBox());

    const spinner = new qx.ui.form.Spinner(6, null, 48);
    this.bind("fontSize", spinner, "value");
    spinner.bind("value", this, "fontSize");

    const part = new qx.ui.toolbar.Part();
    part.add(spinner);

    this.add(new qx.ui.core.Spacer(), {flex: 1});
    this.add(part);

    this._createChildControl("editor");
  },

  members: {
    __ace: null,

    _createChildControlImpl(id) {
      let control;

      switch (id) {
        case "toolbar":
          control = new qx.ui.toolbar.ToolBar();
          this._add(control);
          break;
        case "editor":
          control = new qx.ui.core.Widget();
          this._add(control, {flex: 1});
          break;
      }
      return control || this.base(arguments, id);
    },

    getChildrenContainer() {
      return this.getChildControl("toolbar");
    },

    _getEditor() {
      return this.__ace;
    },

    _getEditorSession() {
      return this.__ace.getSession();
    },

    _onAppear() {
      const widget = this.getChildControl("editor");
      const container = widget.getContentElement().getDomElement();
      const editor = (this.__ace = ace.edit(container));

      // consfigure the editor
      editor.setTheme("ace/theme/xcode");
      editor.setShowPrintMargin(false);
      const session = editor.getSession();
      session.setMode("ace/mode/xml");
      session.setUseSoftTabs(true);
      session.setTabSize(2);
      session.setValue("");
      this._applyFontSize(this.getFontSize());
      this._applyReadOnly(this.getReadOnly());

      // prettier-ignore
      widget.addListener("resize", () => {
        // use a timeout to let the layout queue apply its changes to the dom
        qx.event.Timer.once(() => { 
          this.__ace.resize();
          }, null, 500);
      });
    },

    _applyFontSize(val) {
      this.__ace && this.__ace.setFontSize(val);
    },

    _applyReadOnly(val) {
      this.__ace && this.__ace.setReadOnly(val);
    }
  }
});
