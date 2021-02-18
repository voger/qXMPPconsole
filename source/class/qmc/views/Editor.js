/**
 * 
 * @ignore (ace.edit)
 *
 */
qx.Class.define("qmc.views.Editor", {
  extend: qmc.views.BaseEditor,

  construct() {
    this.base(arguments);
    // const sendBtn = new qx.ui.toolbar.Button(this.tr("Send"));
    // sendBtn.addListener("execute", this._onSend, this);
    // toolbar.add(sendBtn);

    // const sendSelBtn = new qx.ui.toolbar.Button(this.tr("Send Selected"));
    // toolbar.add(sendSelBtn);

    // this._add(toolbar);
    // this.__editor = new qx.ui.core.Widget();
    // this._add(this.__editor, {flex: 1});
  },

  members: {

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
