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
      apply: "__applyFontSize",
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

    const fontIncreaseBtn = new qx.ui.toolbar.Button("A\u2191");
    fontIncreaseBtn.setAppearance("font-size-button-increase");
    // FIXME: This should go to a theme
    fontIncreaseBtn.addListener("execute", this._increaseFont, this);
    this.bind("fontSize", fontIncreaseBtn, "enabled", {
      converter(val) {
        return val <= 48;
      }
    });
    part.add(fontIncreaseBtn);

    const fontDecreaseBtn = new qx.ui.toolbar.Button("A\u2193");
    fontDecreaseBtn.setAppearance("font-size-button-decrease");
    fontDecreaseBtn.addListener("execute", this._decreaseFont, this);
    this.bind("fontSize", fontDecreaseBtn, "enabled", {
      converter(val) {
        return val >= 7;
      }
    });
    part.add(fontDecreaseBtn);

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

    __applyFontSize(val) {
      this.__ace.setFontSize(val);
    },

    _increaseFont() {
      const currentSize = this.getFontSize();
      this.setFontSize(currentSize + 1);
    },

    _decreaseFont() {
      const currentSize = this.getFontSize();
      this.setFontSize(currentSize - 1);
    },

    _onAppear() {
      const container = this.__editor.getContentElement().getDomElement();
      const editor = (this.__ace = ace.edit(container));

      // consfigure the editor
      editor.setTheme("ace/theme/xcode");
      editor.setShowPrintMargin(false);
      editor.setReadOnly(true);
      editor.setFontSize(16);
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
