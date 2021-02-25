// TODO: Make a pretty error messages banner
//       and the logic to support it.
qx.Class.define("qmc.views.Editor", {
  extend: qmc.views.BaseEditor,

  construct() {
    this.base(arguments);

    this.__Range = ace.require("ace/range").Range;

    const part = new qx.ui.toolbar.Part();
    part.setSpacing(3);

    const sendBtn = new qx.ui.form.Button(this.tr("Send"));
    sendBtn.addListener("execute", this._onSend, this);
    sendBtn.setKeepFocus(true);
    part.add(sendBtn);

    const prettifyBtn = new qx.ui.form.Button(this.tr("Prettify"));
    prettifyBtn.addListener("execute", this.prettify, this);
    prettifyBtn.setKeepFocus(true);
    part.add(prettifyBtn);

    this.addAt(part, 0);
  },

  members: {
    // ace editor's Range object
    __Range: null,

    _onSend() {
      const stanza = this.getCurrentStanza();
      var elem = this.xmlParse(stanza);

      const service = qmc.Service.getInstance();
      service.send(elem);
    },

    // override
    _onAppear() {
      this.base(arguments);
      const editor = this.getEditor();
      editor.setBehavioursEnabled(true);
      editor.setDisplayIndentGuides(true);
    },

    getCurrentStanza() {
      const editor = this.getEditor();
      try {
        this.selectCurrentStanza();
        return editor.getSelectedText();
      } catch (err) {
        console.error(err);
      }
    },

    selectCurrentStanza() {
      const editor = this.getEditor();

      const selectionRange = editor.getSelectionRange();
      // if true the we have no selection.
      // Select the current stanza.
      if (
        selectionRange.start.row === selectionRange.end.row &&
        selectionRange.start.column === selectionRange.end.column
      ) {
        // first search for the most close stanza
        // open tag
        const re = /<(iq|message|presence)/gis;
        const searchOpenTag = {
          // needle: re,
          backwards: true,
          range: null,
          regExp: true,
          multiline: true,
          start: selectionRange
        };

        // get selection range start points
        try {
          var {
            start: {row: startRow, column: startColumn}
          } = editor.find(re, searchOpenTag);
        } catch (err) {
          throw new ReferenceError("Start tag invalid");
        }

        // save the stanza name. The selected text
        // is prepended with `<` so remove that
        const stanzaTag = editor.getSelectedText().substring(1);

        // find the closing tag of the stanza
        const searchCloseTag = {
          range: null,
          backwards: false,
          multiline: true,
          start: new this.__Range(startRow, startColumn, startRow, startColumn)
        };

        try {
          var {
            end: {row: endRow, column: endColumn}
          } = editor.find(`</${stanzaTag}>`, searchCloseTag);
        } catch (err) {
          throw new ReferenceError("End tag invalid");
        }

        // create the new range
        const range = new this.__Range(startRow, startColumn, endRow, endColumn);

        // finally select that
        editor.getSelection().setRange(range);
      }
    },

    prettify() {
      const editor = this.getEditor();
      try {
        this.selectCurrentStanza();
        const selectionRange = editor.getSelectionRange();
        let value = editor.getSelectedText();
        value = this.xmlBeautify(value);
        editor.getSession().replace(selectionRange, value);
      } catch (err) {
        console.error(err);
      } finally {
        editor.clearSelection();
      }
    }
  }
});
