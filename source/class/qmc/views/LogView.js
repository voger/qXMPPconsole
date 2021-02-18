/**
 * @ignore(ace.*)
 * @ignore(XmlBeautify)
 * @ignore(require)
 *
 */
qx.Class.define("qmc.views.LogView", {
  extend: qmc.views.BaseEditor,

  properties: {
    readOnly: {
      refine: true,
      init: true
    }
  },

  construct() {
    this.base(arguments);

    this.__xmlFormat = require("xml-formatter");
    this.__dateFormat = new qx.util.format.DateFormat("H:m d/M/y");
  },

  members: {
    // function to format the XML
    __xmlFormat: null,
    __dateFormat: null,

    append(data, meta) {
      const dateTime = this.__dateFormat.format(new Date(meta.timestamp));
      const comment = `<!-- **${meta.type.toUpperCase()}** ${dateTime} -->`;
      const logItem = this.__xmlFormat(comment + data);
      const session = this._getEditorSession();
      // https://stackoverflow.com/a/30222966/2604378
      const location = {
        row: session.getLength(),
        column: 0
      };

      // if we are writting to the first line, don't add any new lines
      const newLine = location.row > 1 ? "\n\n" : "";
      session.insert(location, newLine + logItem);
    }
  }
});
