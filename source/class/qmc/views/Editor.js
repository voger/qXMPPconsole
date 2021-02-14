/**
 * @ignore (ace.edit)
 *
 */
qx.Class.define("qmc.views.Editor", {
  extend: qx.ui.core.Widget,

  construct() {
    this.base(arguments);
    this.addListenerOnce("appear", this._onAppear, this);

    this._setLayout(new qx.ui.layout.VBox());
    const toolbar = new qx.ui.toolbar.ToolBar();
    toolbar.setSpacing(2);

    const sendBtn = new qx.ui.toolbar.Button(this.tr("Send"));
    sendBtn.addListener("execute", this._onSend, this);
    toolbar.add(sendBtn);

    const sendSelBtn = new qx.ui.toolbar.Button(this.tr("Send Selected"));
    toolbar.add(sendSelBtn);

    this._add(toolbar);
    this.__editor = new qx.ui.core.Widget();
    this._add(this.__editor);
  },

  members: {
    __ace: null,
    __editor: null,

    _onAppear() {
      const container = this.__editor.getContentElement().getDomElement();
      const editor = (this.__ace = ace.edit(container));

      // consfigure the editor
      editor.setTheme("ace/theme/xcode");
      editor.setShowPrintMargin(false);
      const session = editor.getSession();
      session.setMode("ace/mode/xml");
      session.setUseSoftTabs(true);
      session.setTabSize(2);
      session.setValue("");

      // prettier-ignore
      this.__editor.addListener("resize", () => {
        // use a timeout to let the layout queue apply its changes to the dom
        qx.event.Timer.once(() => { 
          this.__ace.resize();
          }, null, 500);
      });
    },

    _onSend() {
      const stanza = this.getStanza();
      const elem = qx.xml.Document.fromString(stanza);
      console.log(elem);
    },

    getStanza() {
      return this.__ace.getSession().getValue();
    }
  }
});
