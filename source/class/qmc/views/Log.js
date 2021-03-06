qx.Class.define("qmc.views.Log", {
  extend: qmc.views.BaseEditor,

  properties: {
    readOnly: {
      refine: true,
      init: true
    },

    controller: {
      nullable: true
    }
  },

  construct() {
    this.base(arguments);

    this.__dateFormat = new qx.util.format.DateFormat("H:m:s:SSS d/M/y");

    const part = new qx.ui.toolbar.Part();

    // create a clear button
    const clearBtn = new qx.ui.form.Button(this.tr("Clear All"));
    clearBtn.addListener("execute", () => this.getController().clear());

    part.add(clearBtn);
    this.addAt(part, 0);
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

      if (["received", "send"].includes(meta.type)) {
        logItem = this.formatStanza(comment + data);
      } else {
        logItem = comment + "\n" + data;
      }

      // https://stackoverflow.com/a/30222966/2604378
      let location = {
        row: this.getNumberOfLines(),
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

      // scroll to the last line
      const newLastLine = this.getNumberOfLines();
      this.scrollToLine(newLastLine);
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
    },

    clear() {
      this.setValue("");
    }
  }
});
