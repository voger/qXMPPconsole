// TODO: Make a pretty error messages banner
//       and the logic to support it.
/**
 * @ignore(ace.*)
 *
 */
qx.Class.define("qmc.views.Editor", {
  extend: qmc.views.BaseEditor,
  include: [qmc.command.MCommand],

  construct() {
    this.base(arguments);

    this.__Range = ace.require("ace/range").Range;

    const part = new qx.ui.toolbar.Part();
    part.setSpacing(3);

    const sendCmd = new qx.ui.command.Command("Ctrl+Enter");
    sendCmd.setToolTipText(sendCmd.getShortcut());
    sendCmd.addListener("execute", this.send, this);

    const sendBtn = new qx.ui.form.Button(this.tr("Send"));
    sendBtn.set({
      keepFocus: true,
      command: sendCmd
    });
    part.add(sendBtn);

    const prettifyCmd = new qx.ui.command.Command("Ctrl+Shift+F");
    prettifyCmd.setToolTipText(prettifyCmd.getShortcut());
    prettifyCmd.addListener("execute", this.prettify, this);

    const prettifyBtn = new qx.ui.form.Button(this.tr("Format"));
    prettifyBtn.set({
      keepFocus: true,
      command: prettifyCmd
    });

    part.add(prettifyBtn);

    this.addAt(part, 0);

    // the mixin constructor is called after the class constructor.
    // Let it initialize first.
    // prettier-ignore
    qx.event.Timer.once(function() {
    this.addCommand("format", prettifyCmd);
    this.addCommand("send", sendCmd);
    }, this, 0);
  },

  members: {
    // ace editor's Range object
    __Range: null,

    __commandGroup: null,

    send() {
      try {
        const stanza = this.getCurrentStanza();
        var elem = this.xmlParse(stanza);

        const service = qmc.service.Service.getInstance();
        service.send(elem);
      } catch (err) {
        this.info("Invalid XML.");
      }
    },

    // override
    _onAppear() {
      this.base(arguments);
      const editor = this.getEditor();
      editor.setBehavioursEnabled(true);
      editor.setDisplayIndentGuides(true);
    },

    /**
     * Returns a string containig the stanza where the
     * the cursor is positioned. Currently it doesn't
     * work with self closing tags so please avoid those.
     *
     * @return {String} The current XML stanza
     * @throws {Error} if the XML root tags are not opened and closed properly.
     */
    getCurrentStanza() {
      const editor = this.getEditor();
      this.selectCurrentStanza();
      const selection = editor.getSelectedText();
      editor.clearSelection();
      return selection;
    },

    /**
     * Selects the current stanza relative to the cursor
     * position.
     * Currently it doesn't * work with self closing tags
     * so please avoid those.
     *
     * @throws {Error} if the XML root tags are not opened and closed properly.
     *
     */
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
        var {
          start: {row: startRow, column: startColumn}
        } = editor.find(re, searchOpenTag);

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

        var {
          end: {row: endRow, column: endColumn}
        } = editor.find(`</${stanzaTag}>`, searchCloseTag);

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
        this.info("Invalid XML.");
      } finally {
        editor.clearSelection();
      }
    }
  }
});
