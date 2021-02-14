/**
 * @ignore(ace.*)
 * @ignore(XmlBeautify)
 *
 */
qx.Class.define("qmc.views.Stream", {
  extend: qx.ui.core.Widget,

  construct() {
    this.base(arguments);
    this.addListenerOnce("appear", this._onAppear, this);

    this.__xmlFormat = require("xml-formatter");
    this.__dateFormat = new qx.util.format.DateFormat("H:m d/M/y");
  },

  members: {
    __editor: null,
    __session: null,
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

    _onAppear() {
      const container = this.getContentElement().getDomElement();
      const editor = (this.__editor = ace.edit(container));

      // consfigure the editor
      editor.setTheme("ace/theme/xcode");
      editor.setShowPrintMargin(false);
      editor.setReadOnly(true);
      const session = (this.__session = editor.getSession());
      session.setMode("ace/mode/xml");

      // prettier-ignore
      this.addListener("resize", () => {
        // use a timeout to let the layout queue apply its changes to the dom
        qx.event.Timer.once(() => {
            this.__ace.resize();
          }, null, 500);
      });
    }
  }
});
