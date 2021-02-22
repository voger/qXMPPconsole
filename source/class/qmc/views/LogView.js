/**
 * @ignore(ace.*)
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

    this.__dateFormat = new qx.util.format.DateFormat("H:m d/M/y");
  },

  members: {
    __dateFormat: null,

    /**
     * Append text to the end of the log
     *
     * @param data {String} The data to append
     * @param meta {Object} Some metadata for the data
     * in the form `{timestamp: timestamp, type: type}`
     * @param emptyLine {Boolean} If there should be an
     * empty line before the appended data. Default `true`
     */
    append(data, meta, emptyLine = true) {
      const dateTime = this.__dateFormat.format(new Date(meta.timestamp));
      const comment = `<!-- **${meta.type.toUpperCase()}** ${dateTime} -->`;

      let logItem;

      if (meta.type === "log") {
        logItem = comment + "\n" + data;
      } else {
        logItem = this.formatStanza(comment + data);
      }

      // https://stackoverflow.com/a/30222966/2604378
      let location = {
        row: this.getLength(),
        column: 0
      };

      // if we are writting to the first line, don't add any new lines
      if (location.row > 1) {
        location = this.insertNewLine(location);

        if (emptyLine) {
          location = this.insertNewLine(location);
        }
      }

      this.insert(logItem, location);
    },

    /**
     * Formats the XML stanza. It also adds a comment
     * above it to identify the type and the time
     *
     * @param data {String} The data to append
     * @param meta {Object} Some metadata for the data
     * @return {String} The formated stanza
     */
    formatStanza(data) {
      return this.xmlBeautify(data);
    }
  }
});
