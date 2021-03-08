/**
 * Base editor class.
 * @ignore(ace.edit)
 * @ignore(require)
 * @ignore(XmlBeautify)
 * @ignore(ltx.parse)
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

    // common for all instances
    __xmlFormat: require("xml-formatter"),

    _createChildControlImpl(id) {
      let control;

      switch (id) {
        case "toolbar":
          control = new qx.ui.toolbar.ToolBar();
          this._add(control);
          break;
        case "editor":
          control = new qx.ui.core.Widget();
          control.setAppearance("editor-widget");
          this._add(control, {flex: 1});
          break;
      }
      return control || this.base(arguments, id);
    },

    /**
     * Helper method to beautify XML
     *
     * @param text {String} The XML text to beutify
     * @param formatOpts {Object} XML beautifier format options
     * See https://github.com/chrisbottin/xml-formatter#options
     * for details.
     *
     * @return {String} The formatted XML
     */
    xmlBeautify(text, formatOpts = {}) {
      const opts = {
        indentation: " ",
        collapseContent: true
      };

      qx.lang.Object.mergeWith(opts, formatOpts, true);

      return this.__xmlFormat(text, opts);
    },

    /**
     * Parses a string to XML element
     * @param string {String} the string to parse
     * @return {Element}
     * @throws
     */
    xmlParse(string) {
      return ltx.parse(string);
    },

    getChildrenContainer() {
      return this.getChildControl("toolbar");
    },

    /**
     * Returns the used editor.
     * @return {Object} the editor
     */
    getEditor() {
      return this.__ace;
    },

    /**
     * @return {Integer} The number of lines in the editor.
     *
     */
    getNumberOfLines() {
      return this.getEditor().getSession().getLength();
    },

    /**
     * Insert text at position
     *
     * @param text {String} The text to be inserted
     * @param position {Object} An object describing the position
     * where to enter the text. Default `{row: 1, column: 0}`
     */
    insert(text, position = {row: 1, column: 0}) {
      const session = this.getEditor().getSession();
      session.insert(position, text);
    },

    insertNewLine(position) {
      const doc = this.getEditor().getSession().getDocument();
      return doc.insertMergedLines(position, ["", ""]);
    },

    /**
     * Scrolls the editor to a line. If center is true,
     * it puts the line in middle of screen (or attempts to).
     *
     * @param number {Integer} The line number.
     * @param center {Boolean} If true try to center the line. Default `true`.
     * @param animate {Boolean} If true animate scrolling. Default `true`.
     * @param callback {Function} A function to to be called when animation is finished.
     */
    scrollToLine(number, center = true, animate = true, callback) {
      this.getEditor().scrollToLine(number, center, animate, callback);
    },

    setValue(val) {
      this.getEditor().getSession().setValue(val);
    },

    _onAppear() {
      const widget = this.getChildControl("editor");
      const container = widget.getContentElement().getDomElement();
      const editor = (this.__ace = ace.edit(container));

      const session = editor.getSession();
      session.setMode("ace/mode/xml");
      session.setUseSoftTabs(true);
      session.setTabSize(2);

      // consfigure the editor
      editor.setOptions({
        fontFamily: "Roboto Mono",
        scrollPastEnd: 0.1,
        autoScrollEditorIntoView: true,
        scrollSpeed: 1,
        showPrintMargin: false,
        theme: "ace/theme/xcode"
      });

      // ace.config.setModuleUrl("ace/mode/xml_worker", jsonWorkerUrl)
      // session.setValue("");
      this._applyFontSize(this.getFontSize());
      this._applyReadOnly(this.getReadOnly());

      // prettier-ignore
      widget.addListener("resize", () => {
        // use a timeout to let the layout queue apply its changes to the dom
        qx.event.Timer.once(() => { 
          this.__ace.resize();
          }, null, 500);
      });

      this.setF;
    },

    _applyFontSize(val) {
      // ace initializes on appear
      // so check if it is ready first
      const editor = this.getEditor();
      editor && editor.setFontSize(val);
    },

    _applyReadOnly(val) {
      // ace initializes on appear
      // so check if it is ready first
      const editor = this.getEditor();
      editor && editor.setReadOnly(val);
    }
  }
});
