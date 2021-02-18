/**
 * @ignore(ace.*)
 * @ignore(XmlBeautify)
 *
 */
qx.Class.define("qmc.views.Stream", {
  extend: qx.ui.core.Widget,

  properties: {
    fontSize: {
      check: "Integer",
      apply: "_applyFontSize",
      nullable: false,
      init: 16,
      themeable: true,
      event: "changeFontSize"
    }
  },

  construct() {
    this.base(arguments);
    this.addListenerOnce("appear", this._onAppear, this);

    this._setLayout(new qx.ui.layout.VBox());
    const toolbar = new qx.ui.toolbar.ToolBar();
    toolbar.setSpacing(2);
    const part = new qx.ui.toolbar.Part();

    const label = new qx.ui.basic.Label(this.tr("Font Size"));
    part.add(label);

    const spinner = new qx.ui.form.Spinner(6, null, 48);
    this.bind("fontSize", spinner, "value");
    spinner.bind("value", this, "fontSize");
    part.add(spinner);

    toolbar.add(part);
    this._add(toolbar);
    this.__editor = new qx.ui.core.Widget();
    this._add(this.__editor, {flex: 1});

    this.__xmlFormat = require("xml-formatter");
    this.__dateFormat = new qx.util.format.DateFormat("H:m d/M/y");
  },

  members: {
    __ace: null,
    __editor: null,
    __session: null,

    // function to format the XML
    __xmlFormat: null,
    __dateFormat: null,

    append(data, meta) {
      const dateTime = this.__dateFormat.format(new Date(meta.timestamp));
      const comment = `<!-- **${meta.type.toUpperCase()}** ${dateTime} -->`;
      const logItem = this.__xmlFormat(comment + data);

      // https://stackoverflow.com/a/30222966/2604378
      const location = {
        row: this.__session.getLength(),
        column: 0
      };

      this.__session.insert(location, "\n\n" + logItem);
    },

    _applyFontSize(val) {
      if (this.__ace !== null) {
        this.__ace.setFontSize(val);
      }
    },

    _onAppear() {
      const container = this.__editor.getContentElement().getDomElement();
      const editor = (this.__ace = ace.edit(container));

      // consfigure the editor
      editor.setTheme("ace/theme/xcode");
      editor.setShowPrintMargin(false);
      editor.setReadOnly(true);
      this._applyFontSize(this.getFontSize());
      const session = (this.__session = editor.getSession());
      session.setMode("ace/mode/xml");

      // prettier-ignore
      this.__editor.addListener("resize", () => {
        // use a timeout to let the layout queue apply its changes to the dom
        qx.event.Timer.once(() => {
            this.__ace.resize();
          }, null, 500);
      });
    }
  }
});
